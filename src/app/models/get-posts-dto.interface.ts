export interface GetPostsDto {
  sortBy?: 'date' | 'likes';
  usuarioId?: string;
  offset?: number;
  limit?: number;
}