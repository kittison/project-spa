
const model = require('../../models/report');
const path = require('path')
const ejs = require('ejs');
const puppeteer = require('puppeteer');

let daily_pattern = /^\d{4}-\d{2}-\d{2}$/
let weekly_pattern = /^\d{4}-[a-zA-Z]\d{2}$/
let monthly_pattern = /^\d{4}-\d{2}$/
let range_date_pattern = /^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}$/

exports.Manage_report = async (req, res) => {
    if( req.session.role === "admin" ){
        let [mode, key, value, data, file] = await prepareData(req.query)
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            mode:mode,
            key:key,
            value:value,
            data:data,
            file:file,
            header:"Report",
            file:'admin_page/manage_report'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.Save_report= async (req, res) => {
    if( req.session.role === "admin" && req.query.mode){
        let [mode, key, value, data, file] = await prepareData(req.query)
        if (mode && value && file && data.length > 0) {
            const filePath = path.join(__dirname, '..', '..', 'views', 'admin_page', `${file}.ejs`)
            const html = await ejs.renderFile(filePath, {mode:mode, value: value, data:data} );

            // Generate PDF from the HTML
            const browser = await puppeteer.launch({
                headless: "new", // Opt in to use the new Headless mode
            });
            const page = await browser.newPage();
            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: 'letter' });

            // Send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=report_${mode}_${key}${value}.pdf`);
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


async function prepareData(req_query) {
    // console.log(req_query)
    let mode = req_query.mode
    let key
    let value
    let data
    let file
    if (mode=="used_service"){
        file = 'display_report_service'
        if (daily_pattern.test(req_query.daily)){
            key = 'daily'
            value = req_query.daily
            data =  await model.get_used_service_daily(req_query.daily);
        }else if (weekly_pattern.test(req_query.weekly)){
            key = 'weekly'
            value = req_query.weekly
            data =  await model.get_used_service_weekly(req_query.weekly);
        }else if (monthly_pattern.test(req_query.monthly)){
            key = 'monthly'
            value = req_query.monthly
            data =  await model.get_used_service_monthly(req_query.monthly);
        }else{
            key = 'daily'
            let new_date = new Date();
            value = new_date.toISOString().split('T')[0];
            data =  await model.get_used_service_daily(value);
        }
    } else if (mode=="used_product"){
        file = 'display_report_product'
        if (daily_pattern.test(req_query.daily)){
            key = 'daily'
            value = req_query.daily
            data =  await model.get_used_product_daily(req_query.daily);
        }else if (weekly_pattern.test(req_query.weekly)){
            key = 'weekly'
            value = req_query.weekly
            data =  await model.get_used_product_weekly(req_query.weekly);
        }else if (monthly_pattern.test(req_query.monthly)){
            key = 'monthly'
            value = req_query.monthly
            data =  await model.get_used_product_monthly(req_query.monthly);
        }else{
            key = 'daily'
            let new_date = new Date();
            value = new_date.toISOString().split('T')[0];
            data =  await model.get_used_product_daily(value);
        }
    } else if (mode=="used_product_reuse"){
        file = 'display_report_product_reuse'
        if (daily_pattern.test(req_query.daily)){
            key = 'daily'
            value = req_query.daily
            data =  await model.get_used_product_reuse_daily(req_query.daily);
        }else if (weekly_pattern.test(req_query.weekly)){
            key = 'weekly'
            value = req_query.weekly
            data =  await model.get_used_product_reuse_weekly(req_query.weekly);
        }else if (monthly_pattern.test(req_query.monthly)){
            key = 'monthly'
            value = req_query.monthly
            data =  await model.get_used_product_reuse_monthly(req_query.monthly);
        }else{
            key = 'daily'
            let new_date = new Date();
            value = new_date.toISOString().split('T')[0];
            data =  await model.get_used_product_reuse_daily(value);
        }
    } else if (mode=="work_employee"){
        file = 'display_report_work_employee'
        if (daily_pattern.test(req_query.daily)){
            key = 'daily'
            value = req_query.daily
            data =  await model.get_work_employee_daily(req_query.daily);
        }else if (weekly_pattern.test(req_query.weekly)){
            key = 'weekly'
            value = req_query.weekly
            data =  await model.get_work_employee_weekly(req_query.weekly);
        }else if (monthly_pattern.test(req_query.monthly)){
            key = 'monthly'
            value = req_query.monthly
            data =  await model.get_work_employee_monthly(req_query.monthly);
        }else{
            key = 'daily'
            let new_date = new Date();
            value = new_date.toISOString().split('T')[0];
            data =  await model.get_work_employee_daily(value);
        }
    } else if (mode=="summary_sale"){
        file = 'display_report_summary_sale'
        if (range_date_pattern.test(req_query.range_date)){
            key = 'range_date'
            value = req_query.range_date
            let [start_date, end_date] = req_query.range_date.split('_')
            data =  await model.get_summary_sale(start_date, end_date);
        }else{
            key = 'range_date'
            let new_date = new Date();
            let str_date = new_date.toISOString().split('T')[0]
            value = `${str_date}_${str_date}`;
            data =  await model.get_summary_sale(str_date,str_date);
        }
    }
    return [mode, key, value, data, file]
}