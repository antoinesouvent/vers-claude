<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PublicController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        return $this->render('charly/public/home.html.twig', [
            'title' => 'Accueil',
        ]);
    }

    #[Route('/about', name: 'about')]
    public function about(): Response
    {
        return $this->render('charly/public/about.html.twig', [
            'title' => 'À propos',
        ]);
    }

    #[Route('/products', name: 'public_products')]
    public function products(ProductRepository $productRepository): Response
    {
        // Récupérer les produits depuis la BDD
        $products = $productRepository->findAll();

        dump(count($products));
        dump($products);

        return $this->render('charly/public/products.html.twig', [
            'products' => $products,
            'title' => 'Nos produits',
        ]);
    }
}
