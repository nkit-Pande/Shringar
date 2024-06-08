import React, { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/product.service";
import { ToastAndroid } from 'react-native';

//

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    
    //adding product in setProduct
    useEffect(() => {
        setIsLoading(true);
        productService.getProducts(page).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        });
    }, [page]);

    useEffect(() => {
        setIsLoading(true);
        productService.filterProducts(filters).then((response) => {
            ToastAndroid.show("Products Filtered", ToastAndroid.SHORT);
            setProducts(response.data);
            setIsLoading(false);
        });
    }, [filters]);

    const getProductsByName = (name) => {
        setIsLoading(true);
        console.log("Inside getProductByName");
        productService.getProductByName(name).then((response) => {
            console.log(response.data);
            setProducts([response.data]);
            console.log(products);
            setIsLoading(false);
        });
    };

    const getProductByCategory = (category) => {
        setIsLoading(true);
        productService.getProductsByCategory(category).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        });
    };

    const getProductByMaterial = (material) => {
        setIsLoading(true);
        console.log("It is present");
        productService.getProductsByMaterialType(material).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        });
    };

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                isLoading,
                setIsLoading,
                page,
                setPage,
                filters,
                updateFilters,
                getProductsByName,
                getProductByCategory,
                getProductByMaterial,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

export { ProductContext, ProductProvider, useProduct };