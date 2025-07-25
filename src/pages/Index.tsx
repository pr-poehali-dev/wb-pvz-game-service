import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [activeTab, setActiveTab] = useState('scan');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                WB
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">PVZ</span>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('issue')}
                className={`flex flex-col items-center space-y-1 px-4 py-2 ${
                  activeTab === 'issue' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon name="Package" size={20} />
                <span className="text-xs">Выдача</span>
              </button>
              
              <button
                onClick={() => setActiveTab('pickup')}
                className={`flex flex-col items-center space-y-1 px-4 py-2 ${
                  activeTab === 'pickup' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon name="Truck" size={20} />
                <span className="text-xs">Приёмка</span>
              </button>
              
              <button
                onClick={() => setActiveTab('return')}
                className={`flex flex-col items-center space-y-1 px-4 py-2 ${
                  activeTab === 'return' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon name="RotateCcw" size={20} />
                <span className="text-xs">Возврат</span>
              </button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-700">
                <Icon name="Download" size={16} className="mr-2" />
                Установить версию
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto text-center">
          {/* QR Scanner Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-8">
              Отсканируйте QR-код клиента или курьера
            </h2>
            
            {/* Scanner Image */}
            <div className="mb-8">
              <img 
                src="https://cdn.poehali.dev/files/7ba8289b-55e0-486a-89fc-de5090a4a3bb.png"
                alt="QR Code Scanner"
                className="w-48 h-auto mx-auto"
              />
            </div>
            
            {/* Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">или</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            {/* Phone Input Section */}
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4">
                Введите номер телефона клиента
              </h3>
              
              <div className="space-y-4">
                <Input
                  type="tel"
                  placeholder="Последние 4 цифры номера"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-center text-lg py-3"
                  maxLength={4}
                />
                
                <p className="text-sm text-gray-500">
                  Последние 4 цифры номера
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}