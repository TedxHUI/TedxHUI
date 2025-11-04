import { MapPin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../hooks/use-toast";
import Elipse1 from "../assets/Ellipse 1.png";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message cannot be empty").max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
    });
    reset();
  };

  return (
    <>
    
      {/* Hero Section */}
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">
        <div className="py-24 md:py-36">
          <div className="container mx-auto px-4">
            <div className="max-w-1xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Let's <span className="text-primary">Connect</span> and <span className="text-primary">Collaborate</span>
              </h2>
            </div>
          </div>
        </div>
      </section>


        <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-16">
                <a 
                href="https://maps.google.com/?q=Al-Hikmah+University+Ilorin+Kwara+State+Nigeria" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background border-2 border-foreground rounded-2xl p-6 hover:bg-accent transition-colors group"
                >
                <div className="flex items-start justify-between">
                    <div>
                    <h3 className="font-bold text-lg mb-2">Event Location</h3>
                    <p className="text-sm text-muted-foreground">
                        Al-Hikmah University, Ilorin,<br />
                        Kwara State, Nigeria
                    </p>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
                </a>

                <a 
                href="mailto:tedxhui@gmail.com"
                className="bg-background border-2 border-foreground rounded-2xl p-6 hover:bg-accent transition-colors group"
                >
                <div className="flex items-start justify-between">
                    <div>
                    <h3 className="font-bold text-lg mb-2">Send an Email</h3>
                    <p className="text-sm text-muted-foreground">
                        tedxhui@gmail.com
                    </p>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
                </a>

                <a 
                href="https://wa.me/0900000001" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background border-2 border-foreground rounded-2xl p-6 hover:bg-accent transition-colors group"
                >
                <div className="flex items-start justify-between">
                    <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp Group</h3>
                    <p className="text-sm text-muted-foreground">
                        Join our community group
                    </p>
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
                </a>
            </div>

            {/* Contact Form and Map */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                <h2 className="text-3xl font-bold mb-6">Contact Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                        id="name"
                        placeholder="Enter name"
                        {...register("name")}
                        className="bg-background"
                    />
                    {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        {...register("email")}
                        className="bg-background"
                    />
                    {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                        id="message"
                        placeholder="Message"
                        rows={6}
                        {...register("message")}
                        className="bg-background resize-none"
                    />
                    {errors.message && (
                        <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                    </div>

                    <Button type="submit" className="w-full rounded-full h-12 font-semibold">
                    Submit
                    </Button>
                </form>
                </div>

                <div className="h-[500px] rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.6941774449745!2d4.672784!3d8.814167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103604b6f8e0e5e5%3A0x8e5e5e5e5e5e5e5e!2sAl-Hikmah%20University!5e0!3m2!1sen!2sng!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Event Location Map"
                />
                </div>
            </div>
            </div>
        </div>
        </section>

        
        <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
            <img src={Elipse1} alt="Elipse" />
        </div>

        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Be Part of the First TEDxHUI Experience
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Seats are limited, reserve yours today and witness history in the making.
                </p>
                <button className="bg-white hover:bg-primary/90 text-black font-bold px-10 py-4 text-base rounded-full mt-6 transition-colors">
                Get Your Ticket
                </button>
            </div>
            </div>
        </div>

        </section>
    </>
  );
};

export default ContactSection;
