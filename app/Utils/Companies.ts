const companies = ['OWSE', 'CWS', 'KIP4You'] as const

type Companies = typeof companies[number]

export { companies, Companies }
