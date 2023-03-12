import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: postComment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [`Comment ${postID}`] });
  },
});

export default mutation;
