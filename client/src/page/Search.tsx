import React, { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import DoctorCard from "../components/DoctorCard";
import { tokenAtom } from "../recoil/authAtom";
import { useRecoilValue } from "recoil";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

enum SortByEnum {
    relevance = "relevance",
    experience = "experience",
    fees = "fees",
}

enum SortOrderEnum {
    asc = "asc",
    dec = "desc",
}

interface Doctor {
    fees: number;
    id: number;
    specialty: string;
    education: string;
    user: {
        name: string;
    };
    experience: number;
    preferedTime: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface ISearchInput {
    search: string;
    sortBy: SortByEnum;
    sortOrder: SortOrderEnum;
}

interface SearchResponse {
    success: boolean;
    message: string;
    doctors: Doctor[];
}

const querySchema = z.object({
    search: z.coerce.string().min(1),
    sortBy: z.enum(["relevance", "experience", "fees"]).default("relevance"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

const Search: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [error, setError] = useState<string | null>(null);
    const token = useRecoilValue(tokenAtom);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const source = axios.CancelToken.source();
        setError(null);
        const searchDoctors = async () => {
            if (!searchParams.get("search")) {
                return;
            }
            try {
                const { data } = await axios.get<SearchResponse>(
                    "/api/search",
                    {
                        params: {
                            search: searchParams.get("search"),
                            sortOrder: searchParams.get("sortOrder"),
                            sortBy: searchParams.get("sortBy"),
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        cancelToken: source.token,
                    }
                );
                if (data.doctors.length === 0) {
                    setError("No Doctor Found");
                }
                setDoctors(data.doctors);
            } catch (err) {
                if (axios.isCancel(err)) {
                    return;
                }
                console.log(err);
                if(axios.isAxiosError(err)) {
                    if(err.response?.data.message) {
                        setError(err.response.data.message);
                    } else {
                        setError("Somthing is wrong");
                    }
                }
            }
        };
        searchDoctors();
        return () => {
            source.cancel();
        };
    }, [searchParams]);

    const { register, handleSubmit } = useForm<ISearchInput>();

    const search: SubmitHandler<ISearchInput> = async (data) => {
        const queryParams = querySchema.safeParse({
            search: data.search,
            sortBy: data.sortBy,
            sortOrder: data.sortOrder,
        });
        if (queryParams.error) {
            setSearchParams();
            return;
        }
        setSearchParams(queryParams.data);
    };

    return (
        <div className="p-6">
            <form
                onChange={handleSubmit(search)}
                onSubmit={handleSubmit(search)}
            >
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchParams.get("search") || ""}
                        placeholder="Search for doctors"
                        className="border border-gray-300 p-2 rounded w-full text-gray-900"
                        {...register("search")}
                    />
                    <div className="flex mt-2 space-x-4">
                        <select
                            className="border border-gray-300 p-2 rounded bg-white text-gray-900"
                            value={searchParams.get("sortBy") || "relevance"}
                            {...register("sortBy")}
                        >
                            <option value="relevance">Relevance</option>
                            <option value="experience">Experience</option>
                            <option value="fees">Fees</option>
                        </select>
                        <select
                            className="border border-gray-300 p-2 rounded bg-white text-gray-900"
                            value={searchParams.get("sortOrder") || "asc"}
                            {...register("sortOrder")}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default Search;
