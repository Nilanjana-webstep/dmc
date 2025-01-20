import  svgCaptcha from 'svg-captcha';
 

export const createCaptcha = async (req,res,next)=>{

    try {
        const captcha = svgCaptcha.create();
        console.log('captcha text is : ',captcha.text);
        res.type('svg');
        res.status(200).send(captcha.data);

    } catch (error) {
        
    }
}