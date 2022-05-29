const roles = ['admin', 'user'] as const

type Roles = typeof roles[number]

export { roles, Roles }
