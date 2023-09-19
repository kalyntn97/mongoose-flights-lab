import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate
  })
}

function create(req, res) {
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({}).sort({departs:1})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights
    })
  })
   .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight
    })
  })
    .catch(err => {
      console.log(err)
      res.redirect('/')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log('err')
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    const dt = flight.departs
    const departsDate = dt.toISOString().slice(0,16)
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight: flight,
      departsDate: departsDate
    })
  })
  .catch(err => {
    console.log('err')
    res.redirect('/')
  })
}

function update(req, res) {
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log('err')
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket
}