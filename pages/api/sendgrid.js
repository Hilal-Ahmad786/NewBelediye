import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: 'Prixite Contact Form',
      html: `<div>
        Name: ${req.body.name}
        <br />
        Surname: ${req.body.surname}
        <br />
        Email: ${req.body.email}
        <br />
        Contact: ${req.body.number}
        <br />
        ID Number: ${req.body.idNumber}
        <br />
        Address: ${req.body.address}
        <br />
        Dropdown 1: ${req.body.dropdown1}
        <br />
        Dropdown 2: ${req.body.dropdown2}
        <br />
        Dropdown 3: ${req.body.dropdown3}
        <br />
        Dropdown 4: ${req.body.dropdown4}
        <br />
        Message: ${req.body.message}
        <br />
        Image: ${req.body.image ? req.body.image.name : 'No image uploaded'}
        <br />
        Video: ${req.body.video ? req.body.video.name : 'No video uploaded'}
      </div>`,
    })
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default sendEmail
