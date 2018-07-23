<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use DateTime;
use SplFileObject;

use App\Entity\Transaction;

/**
 * @Route("/api")
 */
class TransactionController extends FOSRestController
{
    /**
     * @Rest\QueryParam(name="q", nullable=true)
     * @Rest\QueryParam(name="orderBy", nullable=true, default="createdAt")
     * @Rest\Get("/transaction", name="transaction")
     */
    public function getTransactionsAction(ParamFetcherInterface $paramFetcher)
    {
        $serializer = $this->get('jms_serializer');
        $user = $this->getUser();
        $db = $this->getDoctrine()->getManager();

        $transactions = [];
        $message = '';

        try {
            $code = 200;
            $error = false;

            $search = $paramFetcher->get('q');
            $orderBy = $paramFetcher->get('orderBy');

            $transactions = $db->getRepository('App:Transaction')->search($user->getId(), $search, $orderBy);

            if (empty($transactions)) {
                $code = 500;
                $error = true;
                $message = 'No transactions found';
            }
        } catch (Exception $e) {
            $code = 500;
            $error = true;
            $message = 'Failed fetch of transactions';
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $transactions : $message,
        ];

        return new Response($serializer->serialize($response, 'json'));
    }

    /**
     * @Rest\Post("/transaction")
     */
    public function createAction(Request $request, ValidatorInterface $validator)
    {
        $serializer = $this->get('jms_serializer');
        $user = $this->getUser();
        $db = $this->getDoctrine()->getManager();

        $amount = $request->request->get('amount', null);
        $concept = $request->request->get('concept', null);
        $transDate = null;
        if ($date = $request->request->get('transaction_date')) {
            $transDate = new DateTime($date);
        }
        $type = $request->request->get('type', 1); //Default type to "Outcome";

        try {
            $code = 201;
            $error = false;

            $type = $db->getRepository('App:TransactionType')->findOneById($type);

            $transaction = new Transaction();
            $transaction->setConcept($concept);
            $transaction->setAmount($amount);
            $transaction->setTransactionDate($transDate);
            $transaction->setType($type);
            $transaction->setOwner($user);

            $errors = $validator->validate($transaction);

            if (count($errors) > 0) {
                $code = 500;
                $error = true;
                $message = (string) $errors;
            } else {
                $db->persist($transaction);
                $db->flush();
            }
        } catch (Exception $e) {
            $code = 500;
            $error = true;

            $message = 'Failed to persist transaction';
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 201 ? $transaction : $message,
        ];

        return new Response($serializer->serialize($response, 'json'));
    }

    /**
     * @Rest\Get("/transaction/{id}", name="transactions_get_transaction")
     */
    public function getTransactionAction($id)
    {
        $serializer = $this->get('jms_serializer');
        $user = $this->getUser();
        $db = $this->getDoctrine()->getManager();

        $transaction = [];
        $message = '';

        try {
            $code = 200;
            $error = false;

            if (!empty($id) || $id < 0) {
                $transaction = $db->getRepository('App:Transaction')->findOneBy([
                    'owner' => $user->getId(),
                    'id' => $id,
                ]);
            } else {
                $code = 500;
                $error = true;
                $message = "Transaction doesn't exist";
            }
        } catch (Exception $e) {
            $code = 500;
            $error = true;
            $message = 'Failed to fetch transaction';
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $transaction : $message,
        ];

        return new Response($serializer->serialize($response, 'json'));
    }

    /**
     * @Rest\Delete("/transaction/{id}", name="transactions_delete_transaction")
     */
    public function deleteAction($id)
     {
         $serializer = $this->get('jms_serializer');
         $user = $this->getUser();
         $db = $this->getDoctrine()->getManager();

         $transaction = null;

         try {
             $transaction = $db->getRepository('App:Transaction')->findOneBy([
                 'id' => $id,
                 'owner' => $user->getId(),
             ]);

             $code = 200;
             $error = false;

             if ($transaction !== null) {
                 $db->remove($transaction);
                 $db->flush();
             } else {
                 $code = 500;
                 $error = true;
                 $message = 'No transaction found';
             }
         } catch (Exception $e) {
             $code = 500;
             $error = true;
             $message = 'Error while trying to delete transaction';
         }

         $response = [
             'code' => $code,
             'error' => $error,
             'data' => $code == 200 ? $transaction : $message,
         ];

         return new Response($serializer->serialize($response, 'json'));
     }

    /**
     * @Rest\Post("/transaction/import", name="transactions_import_file")
     */
    public function importAction(Request $request, ValidatorInterface $validator)
    {
        $serializer = $this->get('jms_serializer');
        $user = $this->getUser();
        $db = $this->getDoctrine()->getManager();

        $code = 200;
        $error = false;
        $message = '';
        $transactions = [];

        //Type is being hardcoded to "Outcome/Expense"
        $type = $db->getRepository('App:TransactionType')->findOneById(1);

        $uploadedFile = $request->files->get('import');

        if (!empty($uploadedFile)) {
            $file = $uploadedFile->openFile('r');
            $file->setFlags(SplFileObject::READ_CSV);

            $rowCount = 0;
            $batchSize = 20;

            foreach ($file as $row) {
                if (array(null) !== $row) {
                    if ($rowCount > 0) {
                        list($concept, $amount, $transDate) = $row;

                        $transaction = new Transaction();
                        $transaction->setConcept($concept);
                        $transaction->setAmount($amount);
                        $transaction->setTransactionDate(DateTime::createFromFormat('m-d-Y H:i:s', $transDate));
                        $transaction->setType($type);
                        $transaction->setOwner($user);

                        $errors = $validator->validate($transaction);

                        if (count($errors) > 0) {
                            $code = 500;
                            $error = true;
                            $message = (string) $errors;

                            break;
                        } else {
                            try {
                                $db->persist($transaction);
                                array_push($transactions, $transaction);

                                if (($rowCount % $batchSize) === 0) {
                                    $db->flush();
                                    $db->clear();
                                }
                            } catch (Exception $e) {
                                $code = 500;
                                $error = true;
                                $message = 'An error occurred when trying to persist transactions';

                                break;
                            }
                        }
                    }
                    $rowCount++;
                }
            }
        } else {
            $code = 500;
            $error = true;
            $message = 'Please submit a valid file.';
        }

        if (!$error) {
            $db->flush();
            $db->clear();
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code === 200 ? $transactions : $message,
        ];

        return new Response($serializer->serialize($response, 'json'));
    }
}
