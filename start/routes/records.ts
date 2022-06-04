import Route from '@ioc:Adonis/Core/Route'

Route.get('/records', 'Records/Main.show')
Route.post('/records', 'Records/Main.store')
