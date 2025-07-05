'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

export async function submitContactForm(data: ContactFormData) {
    try {
        const supabase = await createClient()

        const { count, error: countError } = await supabase
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true })

        if (countError && countError.code === '42P01') {
            console.error('Table does not exist:', countError)
            return { success: false, error: 'Contact form database not set up' }
        }

        if (count !== null && count >= 10) {
            console.error('Contact form limit reached')
            return { success: false, error: 'Contact form limit reached' }
        }

        const { error } = await supabase
            .from('contact_submissions')
            .insert([{
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
                status: 'unread'
            }])

        if (error) {
            console.error('Error saving contact form:', error)
            return { success: false, error: 'Failed to submit contact form' }
        }
        try {
            const emailResult = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: 'devdhaif@gmail.com',
                subject: `New Contact Form: ${data.subject}`,
                html: `
                  <h2 style="color: #333;">New Contact Form Submission</h2>
                  <p style="font-size: 16px; color: #555;">You have received a new contact form submission.</p>
                  <p style="font-size: 16px; color: #555;"><strong style="font-weight: bold; color: #333;" >Name:</strong> ${data.name}</p>
                  <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${data.email}</p>
                  <p style="font-size: 16px; color: #555;"><strong>Subject:</strong> ${data.subject}</p>
                  <p style="font-size: 16px; color: #555;"><strong>Message:</strong></p>
                  <p style="font-size: 16px; color: #555; white-space: pre-line; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;">${data.message.replace(/\n/g, '<br>')}</p>
                `,
            });

            console.log('Email result:', emailResult);

            if (emailResult.error) {
                console.error('Email error:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError);
        }

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Error in contact form submission:', error)
        return { success: false, error: 'Something went wrong' }
    }
}