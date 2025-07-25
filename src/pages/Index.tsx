import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('delivery');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">PZ</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 py-6">
          <div className="space-y-4">
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors">
              <Icon name="Menu" size={20} className="text-gray-600" />
            </button>
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors">
              <Icon name="Package" size={20} className="text-gray-600" />
            </button>
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors">
              <Icon name="Search" size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-gray-600" />
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            SCANNING<br />
            v1.0.67
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Tab Navigation */}
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Выдача
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'rules'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Правила
              </button>
              <button
                onClick={() => setActiveTab('return')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'return'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Возврат
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Bell" size={20} className="text-gray-400" />
                <Icon name="Settings" size={20} className="text-gray-400" />
              </div>
              
              <div className="relative">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">13</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={20} className="text-gray-400" />
                <Icon name="Github" size={20} className="text-gray-400" />
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
                <Icon name="Download" size={16} className="mr-2" />
                Установить версию
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-8">
          {activeTab === 'delivery' && (
            <div className="max-w-md w-full text-center">
              {/* QR Scanner Section */}
              <div className="mb-8">
                <h1 className="text-xl text-gray-700 mb-8 font-normal">
                  Отсканируйте QR-код клиента или курьера
                </h1>
                
                <div className="mb-8">
                  <img 
                    src="https://cdn.poehali.dev/files/b6a7e05f-173d-4642-af99-b27bc7f53fcd.jpg"
                    alt="QR Scanner Device" 
                    className="w-48 h-48 mx-auto object-contain"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="mb-8">
                <span className="text-gray-400 text-sm">или</span>
              </div>

              {/* Phone Input Section */}
              <div>
                <h2 className="text-lg text-gray-700 mb-6 font-normal">
                  Введите номер телефона клиента
                </h2>
                
                <div className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="Последние 4 цифры номера"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-center text-lg py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    maxLength={4}
                  />
                  
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-base font-medium"
                    disabled={phoneNumber.length !== 4}
                  >
                    Найти заказ
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Правила работы</h1>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Сканирование QR-кодов</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Наведите сканер на QR-код клиента</li>
                      <li>• Дождитесь звукового сигнала подтверждения</li>
                      <li>• Проверьте информацию о заказе на экране</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Поиск по номеру телефона</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Введите последние 4 цифры номера клиента</li>
                      <li>• Нажмите кнопку "Найти заказ"</li>
                      <li>• Выберите нужный заказ из списка</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'return' && (
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Обработка возвратов</h1>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Процедура возврата</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Отсканируйте QR-код возвращаемого товара</li>
                      <li>• Проверьте состояние упаковки</li>
                      <li>• Подтвердите возврат в системе</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Условия возврата</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Товар должен быть в оригинальной упаковке</li>
                      <li>• Срок возврата не должен превышать 14 дней</li>
                      <li>• Наличие чека или документа о покупке</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;