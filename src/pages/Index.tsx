import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('issuance');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cdn.poehali.dev/files/be7e0fb0-62e9-4db1-887c-42d007f35852.png" 
                alt="WB Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <Icon name="Menu" size={24} className="text-gray-600" />
              <Icon name="Tag" size={24} className="text-gray-600" />
              <Icon name="Search" size={24} className="text-gray-600" />
            </div>
          </div>

          {/* Center - Navigation tabs */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setSelectedTab('issuance')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'issuance'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Выдача
            </button>
            <button
              onClick={() => setSelectedTab('acceptance')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors relative ${
                selectedTab === 'acceptance'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Приёмка
              <span className="absolute -top-1 -right-2 bg-gray-400 text-white text-xs rounded-full px-1.5 py-0.5">
                13
              </span>
            </button>
            <button
              onClick={() => setSelectedTab('return')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'return'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Возврат
            </button>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            <Icon name="BarChart3" size={24} className="text-gray-600" />
            <Icon name="RotateCcw" size={24} className="text-gray-600" />
            <Icon name="MessageCircle" size={24} className="text-gray-600" />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-green-700 transition-colors">
              <Icon name="Download" size={16} />
              <span>Установить версию</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 bg-white border-r border-gray-200 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-gray-400">
              <Icon name="User" size={24} />
            </div>
          </div>
          <div className="mt-8 px-3 text-xs text-gray-500 text-center">
            <div>ID 50006760</div>
            <div className="mt-1">v1.0.67</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-md mx-auto text-center">
            {/* QR Scanner section */}
            <div className="mb-8">
              <h1 className="text-xl font-medium text-gray-700 mb-8">
                Отсканируйте QR-код клиента или курьера
              </h1>
              
              <div className="relative inline-block">
                <img 
                  src="https://cdn.poehali.dev/files/abb10902-c530-4f8b-ada6-bc77759b69da.png"
                  alt="QR Scanner"
                  className="w-48 h-48 object-contain mx-auto"
                />
              </div>
            </div>

            {/* Alternative input section */}
            <div className="space-y-4">
              <div className="text-gray-500 text-sm">или</div>
              
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-700">
                  Введите номер телефона клиента
                </h2>
                <p className="text-sm text-gray-500">
                  Последние 4 цифры номера
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;