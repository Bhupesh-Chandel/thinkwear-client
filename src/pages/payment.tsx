// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { ArrowLeft, CreditCard, Smartphone, Building, Lock, Check } from 'lucide-react';
// import { useCart } from '../Context/cartContext';

// const PaymentPage: React.FC = () => {
//     const { cartItems, clearCart } = useCart();
//     const navigate = useNavigate();

//     const [paymentMethod, setPaymentMethod] = useState('credit-card');
//     const [formData, setFormData] = useState({
//         cardNumber: '',
//         nameOnCard: '',
//         expiryDate: '',
//         cvv: '',
//         upiId: '',
//         bankName: ''
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;

//         if (name === 'cardNumber') {
//             const formatted = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
//             setFormData(prev => ({ ...prev, [name]: formatted }));
//         } else if (name === 'expiryDate') {
//             const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
//             setFormData(prev => ({ ...prev, [name]: formatted }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const getFirstAvailablePrice = (item: any): number => {
//         const config = item.priceConfiguration;
//         const configKey = Object.keys(config || {})[0];
//         const options = config?.[configKey]?.availableOptions || {};
//         const firstOptionKey = Object.keys(options)[0];
//         return typeof options[firstOptionKey] === "number" ? options[firstOptionKey] : 0;
//     };

//     const subtotal = cartItems.reduce((acc, item) => {
//         const price = getFirstAvailablePrice(item);
//         return acc + price * item.quantity;
//     }, 0);

//     const discount = 0;
//     const taxRate = 0.08;
//     const tax = subtotal * taxRate;
//     const total = subtotal - discount + tax;

//     const validateForm = () => {
//         const { cardNumber, nameOnCard, expiryDate, cvv, upiId, bankName } = formData;

//         const isCreditCardFilled =
//             cardNumber.trim() !== '' &&
//             nameOnCard.trim() !== '' &&
//             expiryDate.trim() !== '' &&
//             cvv.trim() !== '';

//         const isUPIFilled = upiId.trim() !== '';
//         const isNetBankingFilled = bankName.trim() !== '';

//         const filledMethods = [isCreditCardFilled, isUPIFilled, isNetBankingFilled].filter(Boolean).length;
//         if (filledMethods !== 1) return false;

//         switch (paymentMethod) {
//             case 'credit-card':
//                 return (
//                     cardNumber.trim().length === 19 &&
//                     nameOnCard.trim() !== '' &&
//                     expiryDate.trim().length === 5 &&
//                     cvv.trim().length >= 3
//                 );
//             case 'upi':
//                 return upiId.trim() !== '';
//             case 'net-banking':
//                 return bankName.trim() !== '';
//             default:
//                 return false;
//         }
//     };

//     const handlePayment = () => {
//         if (!validateForm()) {
//             alert("Please fill all fields of only one payment method to proceed.");
//             return;
//         }

//         clearCart();
//         navigate("/complete");
//     };

//     const paymentMethods = [
//         {
//             id: 'credit-card',
//             label: 'Credit Card',
//             icon: CreditCard,
//             description: 'Visa, Mastercard, American Express'
//         },
//         {
//             id: 'upi',
//             label: 'UPI',
//             icon: Smartphone,
//             description: 'Pay using UPI ID or QR code'
//         },
//         {
//             id: 'net-banking',
//             label: 'Net Banking',
//             icon: Building,
//             description: 'All major banks supported'
//         }
//     ];

//     const popularBanks = [
//         'State Bank of India', 'HDFC Bank', 'ICICI Bank',
//         'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank'
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-blue-50">
//             <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         <a
//                             href="/"
//                             className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
//                         >
//                             <ArrowLeft size={20} />
//                             <span className="font-medium">Back to Home</span>
//                         </a>
//                         <div className="flex items-center gap-2">
//                             <Lock size={16} className="text-green-500" />
//                             <span className="text-sm text-gray-600">Secure Payment</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="grid lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6 sm:p-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
//                             <div className="space-y-4">
//                                 {paymentMethods.map((method) => (
//                                     <label
//                                         key={method.id}
//                                         className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
//                                             paymentMethod === method.id
//                                                 ? 'border-pink-500 bg-pink-50'
//                                                 : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
//                                         }`}
//                                     >
//                                         <input
//                                             type="radio"
//                                             name="paymentMethod"
//                                             value={method.id}
//                                             checked={paymentMethod === method.id}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="sr-only"
//                                         />
//                                         <div className="flex items-center space-x-4 w-full">
//                                             <div className={`p-3 rounded-xl ${
//                                                 paymentMethod === method.id ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
//                                             }`}>
//                                                 <method.icon size={24} />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="font-semibold text-gray-800">{method.label}</div>
//                                                 <div className="text-sm text-gray-600">{method.description}</div>
//                                             </div>
//                                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                                                 paymentMethod === method.id ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
//                                             }`}>
//                                                 {paymentMethod === method.id && <Check size={12} className="text-white" />}
//                                             </div>
//                                         </div>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6 sm:p-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

//                             {paymentMethod === 'credit-card' && (
//                                 <div className="space-y-6">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
//                                         <input
//                                             type="text"
//                                             name="cardNumber"
//                                             value={formData.cardNumber}
//                                             onChange={handleInputChange}
//                                             placeholder="1234 5678 9012 3456"
//                                             maxLength={19}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none text-lg font-mono"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
//                                         <input
//                                             type="text"
//                                             name="nameOnCard"
//                                             value={formData.nameOnCard}
//                                             onChange={handleInputChange}
//                                             placeholder="John Doe"
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
//                                             <input
//                                                 type="text"
//                                                 name="expiryDate"
//                                                 value={formData.expiryDate}
//                                                 onChange={handleInputChange}
//                                                 placeholder="MM/YY"
//                                                 maxLength={5}
//                                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none font-mono"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
//                                             <input
//                                                 type="text"
//                                                 name="cvv"
//                                                 value={formData.cvv}
//                                                 onChange={handleInputChange}
//                                                 placeholder="123"
//                                                 maxLength={4}
//                                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none font-mono"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {paymentMethod === 'upi' && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
//                                     <input
//                                         type="text"
//                                         name="upiId"
//                                         value={formData.upiId}
//                                         onChange={handleInputChange}
//                                         placeholder="yourname@upi"
//                                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
//                                     />
//                                 </div>
//                             )}

//                             {paymentMethod === 'net-banking' && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Select Bank</label>
//                                     <select
//                                         name="bankName"
//                                         value={formData.bankName}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
//                                     >
//                                         <option value="">Choose your bank</option>
//                                         {popularBanks.map((bank) => (
//                                             <option key={bank} value={bank}>{bank}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6 sm:p-8 sticky top-24">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

//                             <div className="space-y-4 mb-6">
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Subtotal</span>
//                                     <span>₹{subtotal.toFixed(2)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-green-600">
//                                     <span>Discount</span>
//                                     <span>-₹{discount.toFixed(2)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Tax</span>
//                                     <span>₹{tax.toFixed(2)}</span>
//                                 </div>
//                                 <div className="border-t border-gray-200 pt-4">
//                                     <div className="flex justify-between text-xl font-bold text-gray-800">
//                                         <span>Total</span>
//                                         <span>₹{total.toFixed(2)}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <button
//                                 className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
//                                     paymentMethod === 'credit-card'
//                                         ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600'
//                                         : paymentMethod === 'upi'
//                                         ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:from-blue-600 hover:to-fuchsia-600'
//                                         : 'bg-gradient-to-r from-fuchsia-500 to-blue-500 hover:from-fuchsia-600 hover:to-blue-600'
//                                 }`}
//                                 onClick={handlePayment}
//                             >
//                                 Pay Now ₹{total.toFixed(2)}
//                             </button>

//                             <div className="mt-4 text-center">
//                                 <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
//                                     <Lock size={16} className="text-green-500" />
//                                     <span>Your payment information is secure and encrypted</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Smartphone, Building, Lock, Check } from 'lucide-react';
import { useCart } from '../Context/cartContext';

const PaymentPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getFirstAvailablePrice = (item: any): number => {
    const config = item.priceConfiguration;
    const configKey = Object.keys(config || {})[0];
    const options = config?.[configKey]?.availableOptions || {};
    const firstOptionKey = Object.keys(options)[0];
    return typeof options[firstOptionKey] === "number" ? options[firstOptionKey] : 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = getFirstAvailablePrice(item);
    return acc + price * item.quantity;
  }, 0);

  const discount = 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;

  const validateForm = () => {
    const { cardNumber, nameOnCard, expiryDate, cvv, upiId, bankName } = formData;

    const isCreditCardFilled =
      cardNumber.trim() !== '' &&
      nameOnCard.trim() !== '' &&
      expiryDate.trim() !== '' &&
      cvv.trim() !== '';

    const isUPIFilled = upiId.trim() !== '';
    const isNetBankingFilled = bankName.trim() !== '';

    const filledMethods = [isCreditCardFilled, isUPIFilled, isNetBankingFilled].filter(Boolean).length;
    if (filledMethods !== 1) return false;

    switch (paymentMethod) {
      case 'credit-card':
        return (
          cardNumber.trim().length === 19 &&
          nameOnCard.trim() !== '' &&
          expiryDate.trim().length === 5 &&
          cvv.trim().length >= 3
        );
      case 'upi':
        return upiId.trim() !== '';
      case 'net-banking':
        return bankName.trim() !== '';
      default:
        return false;
    }
  };

  const handlePayment = () => {
    if (!validateForm()) {
      alert("Please fill all fields of only one payment method to proceed.");
      return;
    }

    clearCart();
    navigate("/complete");
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      label: 'Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'upi',
      label: 'UPI',
      icon: Smartphone,
      description: 'Pay using UPI ID or QR code'
    },
    {
      id: 'net-banking',
      label: 'Net Banking',
      icon: Building,
      description: 'All major banks supported'
    }
  ];

  const popularBanks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank',
    'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-b border-pink-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </a>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-pink-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 hover:bg-pink-25 dark:hover:bg-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`p-3 rounded-xl ${
                        paymentMethod === method.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        <method.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 dark:text-white">{method.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'border-pink-500 bg-pink-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {paymentMethod === method.id && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-pink-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Payment Details</h2>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-pink-500 focus:outline-none text-lg font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {paymentMethod === 'net-banking' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Bank</label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Choose your bank</option>
                    {popularBanks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-pink-100 dark:border-gray-700 p-6 sm:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  paymentMethod === 'credit-card'
                    ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600'
                    : paymentMethod === 'upi'
                      ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:from-blue-600 hover:to-fuchsia-600'
                      : 'bg-gradient-to-r from-fuchsia-500 to-blue-500 hover:from-fuchsia-600 hover:to-blue-600'
                }`}
                onClick={handlePayment}
              >
                Pay Now ₹{total.toFixed(2)}
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock size={16} className="text-green-500" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
