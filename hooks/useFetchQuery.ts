import { InitialPageParam } from './../node_modules/@tanstack/query-core/src/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const endpoint = 'https://pokeapi.co/api/v2';

export function useFetchQuery(path: string) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await(1)
            return fetch(endpoint + path).then(r => r.json())
        }
    })
}

export function useInfiniteFetchQuery(path: string) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path, 
        queryFn: async ({pageParam}) => {
            await(1)
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(r => r.json())
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next
            } 
            return null
        }      
    })
}

function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000))
}