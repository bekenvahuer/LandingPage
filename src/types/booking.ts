export interface Service {
    id: number;
    name: string;
    nickname: string;
    duration: string;
    price: number;
    disabled?: boolean;
}

export interface BookingData {
    service: Service | null;
    date: string | null;  
    time: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
}

export interface ServiceSelectionProps {
    selectedService: Service | null;
    onSelectService: (service: Service) => void;
    onNext: () => void;
}

export interface DateTimeSelectionProps {
    selectedDate: string | null;
    selectedTime: string | null;
    onSelectDate: (date: string) => void;
    onSelectTime: (time: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export interface ContactDetailsProps {
    formData: Omit<BookingData, 'service' | 'date' | 'time'>;
    onUpdateField: (field: keyof BookingData, value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export interface ConfirmationProps {
    bookingData: BookingData;
    onBackToHome: () => void;
}