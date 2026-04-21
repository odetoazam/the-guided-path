import { permanentRedirect } from 'next/navigation'

export default function PostsIndex() {
  permanentRedirect('/articles')
}
