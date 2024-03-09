
const model = require('../../models/sale');
const path = require('path')
const ejs = require('ejs');
const puppeteer = require('puppeteer');

exports.Create_invoice = async (req, res) => {
    if( req.session.role === "admin" && req.query.sale_id){
        const data = await model.get_sales_save({id:req.query.sale_id})
        if (data.length > 0) {
            res.render('template',{
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                data:data[0],
                header:"Invoice",
                file:'admin_page/create_invoice'
            });
        }
        else {
            res.status(404).send('Not Found');
        }
    }else{
        res.redirect('/admin');
    }
};

exports.Create_receipt = async (req, res) => {
    if( req.session.role === "admin" && req.query.sale_id){
        const data = await model.get_sales_save({id:req.query.sale_id})
        if (data.length > 0) {
            res.render('template',{
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                data:data[0],
                header:"Receipt",
                file:'admin_page/create_receipt'
            });
        }
        else {
            res.status(404).send('Not Found');
        }
    }else{
        res.redirect('/admin');
    }
};

exports.Save_invoice = async (req, res) => {
    if( req.session.role === "admin" && req.query.sale_id){
        const data = await model.get_sales_save({id:req.query.sale_id});
        if (data.length > 0) {
            const filePath = path.join(__dirname, '..', '..', 'views', 'admin_page', 'display_invoice.ejs')
            const html = await ejs.renderFile(filePath, {data:data[0]} );

            // Generate PDF from the HTML
            const browser = await puppeteer.launch({
                headless: "new", // Opt in to use the new Headless mode
            });
            const page = await browser.newPage();
            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: 'letter' });

            // Send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
            res.send(pdfBuffer);

            // Close the browser instance
            await browser.close();
        }
        else {
            res.status(404).send('Not Found');
        }
    }else{
        res.redirect('/admin');
    }

};

exports.Save_receipt = async (req, res) => {
    if( req.session.role === "admin" && req.query.sale_id){
        const data = await model.get_sales_save({id:req.query.sale_id});
        if (data.length > 0) {
            const filePath = path.join(__dirname, '..', '..', 'views', 'admin_page', 'display_receipt.ejs')
            const html = await ejs.renderFile(filePath, {data:data[0]} );

            // Generate PDF from the HTML
            const browser = await puppeteer.launch({
                headless: "new", // Opt in to use the new Headless mode
            });
            const page = await browser.newPage();
            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: 'letter' });

            // Send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=receipt.pdf');
            res.send(pdfBuffer);

            // Close the browser instance
            await browser.close();
        }
        else {
            res.status(404).send('Not Found');
        }
    }else{
        res.redirect('/admin');
    }

};

exports.setInvoiceReceipt =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "save"){
            res.redirect("../create_invoice_receipt");
        }
        else{
            res.redirect("/admin");
        }
    }
};


// ---------------------- validate ----------------------
exports.check_can_add_stock = async (req, res) => {
    let is_same = await model.is_duplicate_name(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};
exports.check_can_remove_stock = async (req, res) => {
    let is_same = await model.compare_4_dec_stock(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};

// exports.Create_invoice_receipt = async (req, res) => {
//     if( req.session.role === "admin" ){
//         const data = {
//             shop: {
//                 shop_name: "ร้านสปา สาขา1",
//                 location: "9/8/7 แขวงกระทุ่มราย เขตหนองจอก กรุงเทพมหานคร 10530",
//                 contact: "0987412365"
//             },
//             invoice_number: 'INV-1',
//             date: '2023-10-10',
//             services: [
//                 { name: 'บริการ1', type: 'ประเภท1', function: {time: 30, price: 150.00}, quantity: 2, total: 300.00 },
//                 { name: 'บริการ2', type: 'ประเภท1', function: {time: 60, price: 280.00}, quantity: 1, total: 150.00 },
//             ],
//             amount: 450.00,
//             discount: 0.00,
//             total: 450.00,
//         };
//         res.render('template',{
//             session_user_id:req.session.user_id,
//             session_user:req.session.user,
//             session_role:req.session.role,
//             data:data,
//             header:"Invoice/Receipt",
//             file:'admin_page/create_invoice_receipt'
//         });
//     }else{
//         res.redirect('/admin');
//     }

// };