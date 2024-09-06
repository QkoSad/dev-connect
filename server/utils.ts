export const isUserId = function(req: unknown): req is { user: { id: string } } {
  let user: unknown = null
  let id: unknown = null
  if (typeof req === 'object' && req)
    if ('user' in req) {
      user = req.user
      if (typeof user === 'object' && user && 'id' in user) {
        id = user.id
        if (typeof id === 'string') {
          return true
        }
      }
    }
  return false
}
