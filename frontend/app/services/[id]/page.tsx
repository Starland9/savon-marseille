'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { servicesAPI, bookingsAPI, Service, ServiceBooking } from '@/lib/api';
import { Store, Clock, Star, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = Number(params.id);
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    booking_date: '',
    booking_time: '',
    notes: '',
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await servicesAPI.getById(serviceId);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    
    try {
      const booking: ServiceBooking = {
        service: serviceId,
        ...formData,
      };
      
      await bookingsAPI.create(booking);
      setBookingSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        booking_date: '',
        booking_time: '',
        notes: '',
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      setBookingError(error.response?.data?.detail || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Service non trouvé</p>
      </div>
    );
  }

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            {service.image ? (
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Store className="w-32 h-32 text-white" />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= service.average_rating ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({service.average_rating.toFixed(1)} / 5) - {service.reviews.length} avis
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Store className="w-5 h-5 mr-3 text-green-600" />
                <div>
                  <p className="font-medium">Boutique</p>
                  <Link href={`/shops/${service.shop}`} className="text-green-600 hover:underline">
                    {service.shop_name}
                  </Link>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-3 text-green-600" />
                <div>
                  <p className="font-medium">Durée</p>
                  <p>{service.duration_minutes} minutes</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <div className="text-3xl font-bold text-green-600">
                  {Number(service.price).toLocaleString()} FCFA
                </div>
              </div>
            </div>

            {/* Reviews */}
            {service.reviews.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Avis clients</h3>
                <div className="space-y-4">
                  {service.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? 'fill-current' : ''
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.user_name}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Réserver ce service</h2>

            {bookingSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p className="font-medium">Réservation confirmée !</p>
                <p className="text-sm">Nous vous contacterons sous peu pour confirmer votre rendez-vous.</p>
              </div>
            )}

            {bookingError && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{bookingError}</p>
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Nom complet
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleInputChange}
                  min={minDate}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Heure
                </label>
                <input
                  type="time"
                  name="booking_time"
                  value={formData.booking_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Informations supplémentaires..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Confirmer la réservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
