import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCategory from '../helpers/ProductCategory';
import VerticalCart from '../components/VerticalCart';
import SummryApi from '../Commen';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("Category");
    const urlCategoryListinObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListinObject[el] = true;
    });

    console.log("urlCategoryListinObject", urlCategoryListinObject);

    const [selectCategory, setSelectCategory] = useState(urlCategoryListinObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);

    const [sortBy, setSortBy] = useState(""); // Corrected typo here from 'shortBy' to 'sortBy'

    const fetchData = async () => {
        try {
            const response = await fetch(SummryApi.productFilter.url, {
                method: SummryApi.productFilter.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Category: filterCategoryList
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const dataResponse = await response.json();
            setData(dataResponse?.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(CategoryKeyName => selectCategory[CategoryKeyName]);
        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => {
            return `Category=${el}`;
        }).join("&&");
        
        navigate("/category-product?" + urlFormat);
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value); 

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        } else if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    useEffect(() => {
        
    }, [sortBy]);

    return (
        <div className='mx-auto px-2 md:px-16 my-4'>
            {/* Desktop version */}
            <div className='lg:grid grid-cols-[200px,1fr]'>
                {/* Left Side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* Sort By */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-200 pb-1'>Sort by</h3>
                        <form className='text-sm flex flex-col py-2 gap-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label>Price - Low To High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label>Price - High To Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter By */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-200 pb-1'>Category</h3>
                        <form className='text-sm flex flex-col py-2 gap-2'>
                            {
                                ProductCategory.map((CategoryName, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-3'>
                                            <input type='checkbox' name={'Category'} value={CategoryName?.value} checked={selectCategory[CategoryName?.value]} id={CategoryName?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={CategoryName?.value}>{CategoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>
                {/* Right Side */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2 ml-4'>Search Results: {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && (
                                <VerticalCart data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryProduct;
