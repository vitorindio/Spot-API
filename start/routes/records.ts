import Route from '@ioc:Adonis/Core/Route'

Route.get('/records', 'Records/Main.show').middleware('auth')
Route.post('/records', 'Records/Main.store').middleware('auth')
Route.put('/records', 'Records/Main.update').middleware('auth')
Route.delete('/records', 'Records/Main.destroy').middleware('auth')

Route.get('/admin/records', 'Records/Main.index').middleware('auth')
