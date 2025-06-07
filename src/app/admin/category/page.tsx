
'use client';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function ListProject() {

    const router = useRouter();

    const [categories, setCategories] = useState([]);


    type categoryType = {
        _id: string,
        description: string,
        name: string,
    }
    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/categories`);
                const data = await response.json();
                setCategories(data?.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        // Cleanup function to reset categories if needed
        return () => {
            setCategories([]);
        }

    }, [])
    const [selectedCategory, setSelectedCategory] = useState({} as categoryType);

    if(!categories) {
        return (
            <div className="bg-white p-4">
                <h1 className="text-2xl font-bold mb-4 text-[#131313]">Loading...</h1>
            </div>
        )
    }


    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/categories/${id}`, {
                method: 'DELETE',
            });
            window.location.reload(); //reload to fetch new categories
           
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        
        <div className="bg-white p-4 rounded-lg shadow-md">
            <a href="/admin/category/new" className='py-2 px-4 bg-[#131313] text-white rounded'>New Category</a>
            <h2 className="text-2xl font-bold mb-4 text-[#131313] mt-3">Project Categories</h2>
            <table className="min-w-full text-[#888] bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-[#131313]">ID</th>
                        <th className="py-2 px-4 border-b text-[#131313]">Category Name</th>
                        <th className="py-2 px-4 border-b text-[#131313]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: categoryType, id) => (
                        <tr key={category?._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{id + 1}</td>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">
                                <a href={`/admin/category/${category._id}`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        router.push(`/admin/category/${category._id}`);
                                    }}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                                <button
                                    onClick={async () => await handleDeleteCategory(category._id)}
                                    className="ml-4 text-red-500 hover:underline"
                                    type="button"
                                >
                                    Delete
                                </button>
                            </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}