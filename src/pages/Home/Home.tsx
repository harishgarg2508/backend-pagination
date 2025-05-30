import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/productCard/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    brand: string;
    price: number;
    thumbnail: string;
}

interface ApiData {
    products: Product[];
    total: number;
    limit: number;
    skip: number;
}

const PAGE_SIZE: number = 8;

const Home: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    
    const fetchProducts = async (page: number): Promise<void> => {
        setIsLoading(true);
        try {
            const skip = page * PAGE_SIZE;
            const response = await axios.get<ApiData>(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
            setProducts(response.data.products);
            setTotalProducts(response.data.total);
            
            localStorage.setItem('products', JSON.stringify(response.data.products));
            localStorage.setItem('totalProducts', response.data.total.toString());
            localStorage.setItem('currentPage', page.toString());
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts(currentPage);
        // console.log("Api called");
    }, [currentPage]);

    const handleChange = (n: number): void => {
        setCurrentPage(n);
    };

    const handlePrevious = (): void => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = (): void => {
        if ((currentPage + 1) * PAGE_SIZE < totalProducts) {
            setCurrentPage(next => next + 1);
        }
    };

    const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return  (
        <>
            <Navbar />
            <h1>Products list</h1>
            <div className="product-container">
                {products.map(p => (
                    <ProductCard
                        key={p.id}
                        image={p.thumbnail}
                        title={p.title}
                        price={p.price}
                        brand={p.brand}
                    />
                ))}
            </div>
            
            <Pagination
                currentPage={currentPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                handleChange={handleChange}
                numberOfPages={numberOfPages}
            />
        </>
    );
};

export default Home;