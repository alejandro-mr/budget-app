<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\User;

/**
 * @Route("/api")
 */
class ApiController extends FOSRestController
{
    /**
     * @Rest\Post("/register", name="user_register")
     */
    public function registerAction(
        Request $request,
        UserPasswordEncoderInterface $encoder,
        ValidatorInterface $validator
    ) {
        $serializer = $this->get('jms_serializer');
        $db = $this->getDoctrine()->getManager();

        $username = $request->request->get('username');
        $password = $request->request->get('password');

        $user = [];
        $message = "";

        try {
            $code = 200;
            $error = false;

            $user = new User();
            $user->setUsername($username);
            $user->setPassword($password);

            $errors = $validator->validate($user);

            if (count($errors) > 0) {
                $code = 500;
                $error = true;
                $message = (string) $errors;
            } else {
                $user->setPassword($encoder->encodePassword($user, $password));

                $db->persist($user);
                $db->flush();
            }
        } catch (Exception $e) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to register the user - Error: {$e->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $user : $message,
        ];

        return new Response($serializer->serialize($response, 'json'));
    }

}
