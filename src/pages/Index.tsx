import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Симуляция базы данных заказов
const mockOrders = [
  { 
    id: '1234567890', 
    phone: '1234', 
    customer: 'Иван Петров', 
    items: ['Куртка зимняя', 'Ботинки'], 
    total: 4500,
    status: 'ready_for_pickup'
  },
  { 
    id: '2345678901', 
    phone: '5678', 
    customer: 'Мария Сидорова', 
    items: ['Платье летнее'], 
    total: 2300,
    status: 'ready_for_pickup'
  },
  { 
    id: '3456789012', 
    phone: '9012', 
    customer: 'Алексей Козлов', 
    items: ['Рюкзак туристический', 'Термос'], 
    total: 3200,
    status: 'issued'
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('issue');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Функция поиска заказа по номеру телефона
  const searchByPhone = () => {
    if (phoneNumber.length !== 4) return;
    
    const order = mockOrders.find(o => o.phone === phoneNumber);
    if (order) {
      setFoundOrder(order);
    } else {
      alert('Заказ не найден');
    }
  };

  // Функция начала сканирования QR
  const startQRScan = async () => {
    try {
      setIsScanning(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Симуляция успешного сканирования через 3 секунды
      setTimeout(() => {
        const randomOrder = mockOrders[Math.floor(Math.random() * mockOrders.length)];
        setScanResult(`QR:${randomOrder.id}`);
        setFoundOrder(randomOrder);
        stopQRScan();
      }, 3000);
      
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      alert('Не удалось получить доступ к камере');
      setIsScanning(false);
    }
  };

  // Функция остановки сканирования
  const stopQRScan = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  // Функция выдачи заказа
  const issueOrder = () => {
    if (foundOrder) {
      alert(`Заказ ${foundOrder.id} выдан клиенту ${foundOrder.customer}`);
      setFoundOrder(null);
      setPhoneNumber('');
      setScanResult('');
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header точно как в WB PVZ */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">WB</span>
              </div>
              <span className="text-sm font-medium">PVZ</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600">
              <Icon name="Menu" size={16} />
              <Icon name="Search" size={16} />
              <Icon name="Search" size={16} />
            </div>
          </div>

          {/* Center Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('issue')}
              className={`flex flex-col items-center space-y-1 px-6 py-2 ${
                activeTab === 'issue' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500'
              }`}
            >
              <Icon name="Package" size={20} />
              <span className="text-sm">Выдача</span>
            </button>
            
            <button
              onClick={() => setActiveTab('pickup')}
              className={`flex flex-col items-center space-y-1 px-6 py-2 ${
                activeTab === 'pickup' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500'
              }`}
            >
              <Icon name="Truck" size={20} />
              <span className="text-sm">Приёмка</span>
            </button>
            
            <button
              onClick={() => setActiveTab('return')}
              className={`flex flex-col items-center space-y-1 px-6 py-2 relative ${
                activeTab === 'return' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon name="RotateCcw" size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  13
                </span>
              </div>
              <span className="text-sm">Возврат</span>
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="BarChart" size={16} />
              <Icon name="Search" size={16} />
              <Icon name="MessageCircle" size={16} />
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 text-sm px-4 py-2">
              <Icon name="Download" size={16} className="mr-1" />
              Установить версию
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          
          {/* QR Scanner / Phone Input Section */}
          {!foundOrder && (
            <div className="text-center">
              <h1 className="text-xl text-gray-700 mb-8">
                Отсканируйте QR-код клиента или курьера
              </h1>
              
              {/* QR Scanner */}
              <div className="mb-8">
                {!isScanning ? (
                  <div 
                    className="cursor-pointer"
                    onClick={startQRScan}
                  >
                    <img 
                      src="https://cdn.poehali.dev/files/7ba8289b-55e0-486a-89fc-de5090a4a3bb.png"
                      alt="QR Scanner"
                      className="w-64 h-auto mx-auto hover:opacity-80 transition-opacity"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-64 h-48 mx-auto bg-black rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-purple-500 rounded-lg animate-pulse"></div>
                    </div>
                    <Button 
                      onClick={stopQRScan}
                      variant="outline"
                      className="mt-4"
                    >
                      Остановить сканирование
                    </Button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500">или</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Phone Input */}
              <div>
                <h2 className="text-lg text-gray-700 mb-4">
                  Введите номер телефона клиента
                </h2>
                
                <div className="space-y-3">
                  <Input
                    type="tel"
                    placeholder="Последние 4 цифры номера"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setPhoneNumber(value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        searchByPhone();
                      }
                    }}
                    className="text-center text-lg py-3 border-gray-300 focus:border-purple-500"
                    maxLength={4}
                  />
                  
                  <p className="text-sm text-gray-500">
                    Последние 4 цифры номера
                  </p>
                  
                  {phoneNumber.length === 4 && (
                    <Button 
                      onClick={searchByPhone}
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                    >
                      Найти заказ
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          {foundOrder && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Найден заказ</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Номер заказа:</span>
                  <span className="font-medium">{foundOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Клиент:</span>
                  <span className="font-medium">{foundOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Телефон:</span>
                  <span className="font-medium">****{foundOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Сумма:</span>
                  <span className="font-medium">{foundOrder.total} ₽</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Товары:</h3>
                <ul className="space-y-1">
                  {foundOrder.items.map((item: string, index: number) => (
                    <li key={index} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={issueOrder}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Package" size={16} className="mr-2" />
                  Выдать заказ
                </Button>
                <Button 
                  onClick={() => {
                    setFoundOrder(null);
                    setPhoneNumber('');
                    setScanResult('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}