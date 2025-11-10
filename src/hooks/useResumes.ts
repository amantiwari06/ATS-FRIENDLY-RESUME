import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  personal_info: any;
  education: any[];
  experience: any[];
  skills: any[];
  certifications: any[];
  template: string;
  ats_score: number | null;
  last_analyzed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useResumes = () => {
  const queryClient = useQueryClient();

  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });

  const createResume = useMutation({
    mutationFn: async (title: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('resumes')
        .insert([{ user_id: user.id, title }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success('Resume created successfully');
    },
    onError: () => {
      toast.error('Failed to create resume');
    },
  });

  const updateResume = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Resume> }) => {
      const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success('Resume updated successfully');
    },
    onError: () => {
      toast.error('Failed to update resume');
    },
  });

  const deleteResume = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success('Resume deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete resume');
    },
  });

  return {
    resumes,
    isLoading,
    createResume,
    updateResume,
    deleteResume,
  };
};
