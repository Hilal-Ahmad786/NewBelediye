import { Grid, Box, Button } from '@mui/material'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { contactForm } from '../../../data/data'

// Define the type for the form state
interface FormState {
  name: string
  surname: string
  email: string
  number: string
  company: string
  idNumber: string
  address: string
  dropdown1: string
  dropdown2: string
  dropdown3: string
  dropdown4: string
  message: string
  image: File | null
  video: File | null
}

// Define the type for dropdown options
type DropdownOption = {
  value: string
  label: string
}

const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    surname: '',
    email: '',
    number: '',
    company: '',
    idNumber: '',
    address: '',
    dropdown1: '',
    dropdown2: '',
    dropdown3: '',
    dropdown4: '',
    message: '',
    image: null,
    video: null,
  })

  const [dropdown2Options, setDropdown2Options] = useState<DropdownOption[]>([])
  const [dropdown2Placeholder, setDropdown2Placeholder] =
    useState('Select Option 2')

  const formSuccess = () => toast.success(contactForm.success)
  const formError = () => toast.error(contactForm.error)

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/sendgrid', {
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    if (error) {
      formError()
    } else {
      formSuccess()
      setForm({
        name: '',
        surname: '',
        email: '',
        number: '',
        company: '',
        idNumber: '',
        address: '',
        dropdown1: '',
        dropdown2: '',
        dropdown3: '',
        dropdown4: '',
        message: '',
        image: null,
        video: null,
      })
      setDropdown2Placeholder('Select Option 2')
      setDropdown2Options([])
    }
  }

  const handleDropdown1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setForm({ ...form, dropdown1: value, dropdown2: '' })

    let options: DropdownOption[] = []
    let placeholder = 'Select Option 2'
    switch (value) {
      case 'Talep':
        options = [
          { value: 'Sosyal Yardım Talebi', label: 'Sosyal Yardım Talebi' },
          { value: 'Bilgi Edinme', label: 'Bilgi Edinme' },
          { value: 'Ruhsat', label: 'Ruhsat' },
          { value: 'İmar', label: 'İmar' },
        ]
        placeholder = 'Talep'
        break
      case 'Şikayet':
        options = [
          { value: 'Ulaşım', label: 'Ulaşım' },
          { value: 'Temizlik', label: 'Temizlik' },
          { value: 'Zabıta', label: 'Zabıta' },
          { value: 'İmar', label: 'İmar' },
          { value: 'Aydınlatma', label: 'Aydınlatma' },
        ]
        placeholder = 'Şikayet'
        break
      case 'Öneri':
        options = [
          { value: 'Ulaşım', label: 'Ulaşım' },
          { value: 'Temizlik', label: 'Temizlik' },
          { value: 'Kültür', label: 'Kültür' },
          { value: 'Eğitim', label: 'Eğitim' },
          { value: 'Teknoloji', label: 'Teknoloji' },
        ]
        placeholder = 'Öneri'
        break
      default:
        options = []
    }
    setDropdown2Options(options)
    setDropdown2Placeholder(placeholder)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setForm({ ...form, [name]: files[0] })
    }
  }

  return (
    <>
      <ToastContainer autoClose={5000} position="top-center" />
      <form className="contact-form" onSubmit={handleForm}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Grid item xs={12} className="input-field-container">
            <select
              name="dropdown1"
              className="input-field"
              value={form.dropdown1}
              onChange={handleDropdown1Change}
            >
              <option value="" disabled>
                Başvuru Türünüzü seçiniz
              </option>
              <option value="Talep">Talep</option>
              <option value="Şikayet">Şikayet</option>
              <option value="Öneri">Öneri</option>
            </select>
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <select
              name="dropdown2"
              className="input-field"
              value={form.dropdown2}
              onChange={(e) => setForm({ ...form, dropdown2: e.target.value })}
            >
              <option value="" disabled>
                {dropdown2Placeholder}
              </option>
              {dropdown2Options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <select
              name="dropdown3"
              className="input-field"
              value={form.dropdown3}
              onChange={(e) => setForm({ ...form, dropdown3: e.target.value })}
            >
              <option value="" disabled>
                Başvuru İçin İlgili Birimi Seçiniz
              </option>
              <option value="Genel Sekreterlik">Genel Sekreterlik</option>
              <option value="Bilgi İşlem">Bilgi İşlem</option>
              <option value="İnsan Kaynakları">İnsan Kaynakları</option>
              <option value="Park Bahçeler">Park Bahçeler</option>
              <option value="Ulaşım">Ulaşım</option>
              <option value="Diğer">Diğer</option>
            </select>
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <select
              name="dropdown4"
              className="input-field"
              value={form.dropdown4}
              onChange={(e) => setForm({ ...form, dropdown4: e.target.value })}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <PersonOutlineOutlinedIcon className="input-field-icon" />
            <input
              name="name"
              required
              className="input-field"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <PersonOutlineOutlinedIcon className="input-field-icon" />
            <input
              name="surname"
              required
              className="input-field"
              type="text"
              placeholder="Surname"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <EmailOutlinedIcon className="input-field-icon" />
            <input
              name="email"
              required
              className="input-field"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <PhoneInTalkOutlinedIcon className="input-field-icon" />
            <input
              name="number"
              className="input-field"
              type="number"
              placeholder="Phone Number"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <BusinessCenterOutlinedIcon className="input-field-icon" />
            <input
              name="company"
              className="input-field"
              type="text"
              placeholder="Company Name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <BusinessCenterOutlinedIcon className="input-field-icon" />
            <input
              name="idNumber"
              className="input-field"
              type="text"
              placeholder="ID Number"
              value={form.idNumber}
              onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <BusinessCenterOutlinedIcon className="input-field-icon" />
            <input
              name="address"
              className="input-field"
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <MessageOutlinedIcon className="input-field-icon" />
            <textarea
              name="message"
              required
              className="text-area"
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <label>Image</label>
            <input
              name="image"
              className="input-field"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} className="input-field-container">
            <label>Video</label>
            <input
              name="video"
              className="input-field"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Box className="submit-button">
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<SendOutlinedIcon />}
              className="contact-us-button"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default ContactForm
