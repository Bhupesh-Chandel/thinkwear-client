import { Award,Heart, Truck, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router';
import Profile from "../../Profile.jpeg";
const About = () => {
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '50+', label: 'Countries' },
    { number: '5 Years', label: 'Experience' },
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'We source only the finest materials and work with trusted manufacturers to ensure every product meets our high standards.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Free worldwide shipping on all orders over $50. Express delivery available for those who can\'t wait.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Shopping',
      description: 'Your privacy and security are our top priorities. Shop with confidence using our encrypted checkout process.'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Our friendly customer service team is always here to help. Reach out anytime, we\'re here for you.'
    },
  ];

  const team = [
    {
      name: 'Bhupesh',
      role: 'Founder & CEO',
      image: Profile,
      description: 'Programmer and entrepreneur with 15 years of industry experience.'
    },
    {
      name: 'Raman',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      description: 'Award-winning designer passionate about sustainable fashion.'
    },
    {
      name: 'Khushi',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'Digital marketing expert with a love for brand storytelling.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            About ThinkWear
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We're passionate about bringing you the latest fashion trends with exceptional quality and unmatched style.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 px-4 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-800 mb-6  dark:text-white">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed dark:text-white">
                Founded in 2024, ThinkWear began as a small boutique in the heart of Dehradun. Our founder, Bhupesh, had a vision to make high-quality, fashionable clothing accessible to everyone, regardless of their budget or location.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed  dark:text-white">
                What started as a passion project has grown into a global brand, serving customers in over 50 countries. We believe that fashion is a form of self-expression, and everyone deserves to feel confident and stylish in what they wear.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed  dark:text-white">
                Today, we continue to curate collections that blend timeless elegance with contemporary trends, always maintaining our commitment to quality, sustainability, and exceptional customer service.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Our Story"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium dark:text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4  dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in dark:text-white">
              Our Mission & Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full animate-scale-in"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-fade-in dark:bg-[#121212]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed dark:text-white">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in dark:text-white" style={{ animationDelay: '0.2s' }}>
              The passionate individuals behind ThinkWear, dedicated to bringing you the best in fashion and customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed  dark:text-white">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold mb-6">
            Join the ThinkWear Family
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference that passion, quality, and dedication make. 
            Start your style journey with us today.
          </p>
           <Link to={"/products"}>
               <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Shop Now
              </button>
           </Link>
        </div>
      </section>

    </div>
  );
};

export default About;