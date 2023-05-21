import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from './services/blogs'

export const getBlogs = () => {
    const result = useQuery('blogs', blogService.getAll())

    return result.data
  }