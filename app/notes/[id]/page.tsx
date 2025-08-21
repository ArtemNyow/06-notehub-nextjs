import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";



import NoteDetailsClient from "./NoteDetailsClient";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsProps {
  params: {id:string};
}

export default async function  NoteDetails ({ params }: NoteDetailsProps) {
    const id = Number(params.id);
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(params.id),
    });
    const dehydratedState = dehydrate(queryClient);
  return (
      <HydrationBoundary state={dehydratedState}>
          <NoteDetailsClient/>
    </HydrationBoundary>

  );
}
