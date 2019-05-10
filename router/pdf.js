const router = require('express').Router()
const fs = require('fs')
var hbars = require('handlebars')
const pdf = require('html-pdf')
const transporter = require('./../helper/nodemailer')

router.get('/', (req, res) => {
    res.send('<h1>Selamat Datang di Main Route Router PDF </h1>')
})

router.get('/test', (req, res) => {
    fs.readFile('./template/invoice.html', {encoding: 'utf-8'}, (err, hasilRead) => {
        if(err) throw err
        var template = hbars.compile(hasilRead)
        var data = {no : '14045Book',
                    nama : 'gema',
                    tanggal : '2019, 04-26',
                    total : 'Rp. 90.000.000',
                    jatuhtempo : '2019, 04-28'}
        var hasilHbars = template(data)
        //res.send(hasilHbars)
        var options = {
            format : 'A4',
            orientation : 'potrait',
            border : {
                "top": "0.5in",          
                "right": "0.5in",
                "bottom": "0.5in",
                "left": "0.5in"
              }
        }
        // pdf.create(hasilHbars, options).toFile('./template/invoice.pdf', (err, hasilPdf) => {
        //     if(err) throw err
        //     res.send('PDF Created')
        //     console.log(hasilPdf)
        // })
        pdf.create(hasilHbars, options).toStream((err, hasilStream) => {
            if(err) throw err
            var optionsNod = {
                from : 'lokalmarket.com',
                to : 'gemamreza@gmail.com',
                subject : 'Invoice untuk ' + data.nama,
                html : '<h1> Ini adalah invoice pembayaran untuk anda. </h1>',
                attachments :  [
                    {
                        filename : 'invoice.pdf',
                        content : hasilStream
                    }
                ]
            }
            transporter.sendMail(optionsNod, (err, resultMail) => {
                if(err) throw(err)
                res.send('Email SENT!')
            })
        })
    })
})

router.post('/test', (req, res) => {
    fs.readFile('./template/invoice.html', {encoding: 'utf-8'}, (err, hasilRead) => {
        if(err) throw err
        var template = hbars.compile(hasilRead)
        var data = {no : req.body.no,
                    nama : req.query.nama,
                    tanggal : req.body.tanggal,
                    total : 'Rp. ' + req.body.total,
                    jatuhtempo : req.body.jatuhtempo}
        var hasilHbars = template(data)
        //res.send(hasilHbars)
        var options = {
            format : 'A4',
            orientation : 'potrait',
            border : {
                "top": "0.5in",          
                "right": "0.5in",
                "bottom": "0.5in",
                "left": "0.5in"
              }
        }
        // pdf.create(hasilHbars, options).toFile('./template/invoice.pdf', (err, hasilPdf) => {
        //     if(err) throw err
        //     res.send('PDF Created')
        //     console.log(hasilPdf)
        // })
        pdf.create(hasilHbars, options).toStream((err, hasilStream) => {
            if(err) throw err
            var optionsNod = {
                from : 'lokalmarket.com',
                to : 'gemamreza@gmail.com',
                subject : 'Invoice untuk ' + data.nama,
                html : '<h1> Ini adalah invoice pembayaran untuk anda. </h1>',
                attachments :  [
                    {
                        filename : 'invoice.pdf',
                        content : hasilStream
                    }
                ]
            }
            transporter.sendMail(optionsNod, (err, resultMail) => {
                if(err) throw(err)
                res.send('Email SENT!')
            })
        })
    })
})
module.exports = router