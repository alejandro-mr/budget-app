<?php

namespace App\Repository;

use App\Entity\Transaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

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

//    /**
//     * @return Transaction[] Returns an array of Transaction objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transaction
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
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
            $query->andWhere("t.concept LIKE :concept")
                ->setParameter('concept', '%' . $search . '%');
        }

        return $query->getQuery()
            ->getResult();
    }
}
