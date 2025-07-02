import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, CheckCircle, Loader2 } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

const ShippingAddressForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipPostalCode: '',
    country: 'United States',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const countries: string[] = [
    'United States',
    'India',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Other',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.stateProvince.trim()) newErrors.stateProvince = 'State/Province is required';
    if (!formData.zipPostalCode.trim()) newErrors.zipPostalCode = 'Zip/Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setIsLoading(false);
    setIsSuccess(true);
    navigate("/payment");
  };

  const inputBaseClass =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400";

  const getInputClass = (id: string) =>
    `${inputBaseClass} ${
      errors[id]
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 dark:border-zinc-700 focus:ring-fuchsia-500"
    }`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-fuchsia-700 dark:text-fuchsia-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <div className="flex items-center mb-2">
            <MapPin className="w-6 h-6 text-fuchsia-700 dark:text-fuchsia-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shipping Address
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Please enter your shipping details below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First/Last Name */}
              {["firstName", "lastName"].map(id => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white"
                  >
                    {id === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    type="text"
                    id={id}
                    name={id}
                    value={(formData as any)[id]}
                    onChange={handleInputChange}
                    className={getInputClass(id)}
                    placeholder={`Enter your ${id === "firstName" ? "first" : "last"} name`}
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}

              {/* Email */}
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={getInputClass("email")}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={getInputClass("phone")}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Street Address */}
              <div className="md:col-span-2">
                <label htmlFor="streetAddress" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className={getInputClass("streetAddress")}
                  placeholder="Enter your street address"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
                )}
              </div>

              {/* City, State, Zip */}
              {[
                { label: "City", id: "city" },
                { label: "State / Province", id: "stateProvince" },
                { label: "Zip / Postal Code", id: "zipPostalCode" },
              ].map(({ label, id }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                    {label}
                  </label>
                  <input
                    type="text"
                    id={id}
                    name={id}
                    value={(formData as any)[id]}
                    onChange={handleInputChange}
                    className={getInputClass(id)}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={getInputClass("country") + " bg-white dark:bg-zinc-900"}
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
                  isSuccess
                    ? "bg-green-600 text-white"
                    : isLoading
                    ? "bg-fuchsia-400 text-white cursor-not-allowed"
                    : "bg-fuchsia-600 text-white hover:bg-fuchsia-700 active:bg-fuchsia-700"
                }`}
              >
                {isSuccess ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Address Saved Successfully!
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving Address...
                  </div>
                ) : (
                  "Save Address"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
