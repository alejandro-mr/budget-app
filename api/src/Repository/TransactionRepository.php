<?php

namespace App\Repository;

use App\Entity\Transaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use DateTime;

/**
 * @method Transaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaction[]    findAll()
 * @method Transaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Transaction::class);
    }

    /**
     * @return Transaction[]
     */
    public function search($userId, $search, $order)
    {
        if (in_array(
            $order,
            [
                'createdAt',
                'updatedAt',
                'concept',
                'id',
                'amount'
            ]
        )) {
            $orderBy = 't.' . $order;
        } else {
            $orderBy = 't.createdAt';
        }
        $query = $this->createQueryBuilder('t')
            ->where('t.owner = :owner')
            ->setParameter('owner', $userId)
            ->orderBy($orderBy, 'DESC');

        if (!empty($search)) {
            if (is_numeric($search)) {
                $query->andWhere('t.amount BETWEEN :amountFloor and :amountCeil')
                    ->setParameter('amountFloor', floor($search))
                    ->setParameter('amountCeil', ceil($search));
            } else if ((bool)strtotime($search)) {
                $dateQuery = new DateTime($search);

                $query->andWhere('t.transactionDate > :dateStart')
                    ->andWhere('t.transactionDate < :dateEnd')
                    ->setParameter('dateStart', $dateQuery->format('Y-m-d 00:00:00'))
                    ->setParameter('dateEnd', $dateQuery->format('Y-m-d 23:59:59'));
            } else {
                $query->andWhere('t.concept LIKE :concept')
                    ->setParameter('concept', '%' . $search . '%');
            }
        }

        return $query->getQuery()
            ->getResult();
    }
}
