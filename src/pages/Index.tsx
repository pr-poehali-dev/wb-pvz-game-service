import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('issuance');
  const [pickupStep, setPickupStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [boxBarcode, setBoxBarcode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

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
        <main className="flex-1">
          {selectedTab === 'issuance' && (
            <div className="p-8">
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
            </div>
          )}

          {selectedTab === 'acceptance' && (
            <div className="flex">
              {/* Sidebar menu for pickup */}
              <aside className="w-64 bg-white border-r border-gray-200 py-6">
                <div className="px-4 text-xs text-gray-500 mb-6">
                  <div>ID 50000234</div>
                  <div className="mt-1">V1.0.51</div>
                </div>
                
                <nav className="space-y-2 px-2">
                  <div className="flex items-center space-x-3 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Icon name="Package" size={20} />
                    <span className="text-sm font-medium">Товары</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Icon name="RefreshCw" size={20} />
                    <span className="text-sm">Смена ячейки</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer relative">
                    <Icon name="RotateCcw" size={20} />
                    <span className="text-sm">Принять снова</span>
                    <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      8
                    </span>
                  </div>
                </nav>
              </aside>

              {/* Main pickup content */}
              <div className="flex-1 p-8">
                {/* Back button */}
                <div className="mb-8">
                  <button 
                    onClick={() => setSelectedTab('issuance')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Вернуться к приемке</span>
                  </button>
                </div>

                {/* Progress stepper */}
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="flex items-center justify-center space-x-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                          step === 1 ? 'bg-purple-600 text-white' : 
                          step <= pickupStep ? 'bg-purple-100 text-purple-600' : 
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {step}
                        </div>
                        {step < 4 && (
                          <div className={`w-16 h-px ml-4 ${
                            step < pickupStep ? 'bg-purple-600' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scan box sticker section */}
                <div className="max-w-md mx-auto text-center">
                  <h1 className="text-2xl font-medium text-gray-800 mb-12">
                    Отсканируйте стикер коробки
                  </h1>
                  
                  {/* QR Code Scanner */}
                  <div className="mb-12">
                    {!isScanning ? (
                      <div 
                        className="cursor-pointer"
                        onClick={() => setIsScanning(true)}
                      >
                        <div className="w-64 h-64 mx-auto bg-gray-50 border-4 border-dashed border-purple-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 bg-black rounded">
                              <svg className="w-full h-full text-white p-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm6-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm10 0h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-64 h-64 mx-auto bg-black rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 border-2 border-purple-500 rounded-lg animate-pulse"></div>
                        </div>
                        <Button 
                          onClick={() => setIsScanning(false)}
                          variant="outline"
                          className="mt-4"
                        >
                          Остановить сканирование
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Manual input */}
                  <div className="space-y-6">
                    <div className="text-gray-500">или</div>
                    
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="89585787658"
                        value={boxBarcode}
                        onChange={(e) => setBoxBarcode(e.target.value)}
                        className="text-center text-lg py-3 border-purple-200 focus:border-purple-500 rounded-full"
                      />
                      
                      {boxBarcode && (
                        <Button 
                          onClick={() => {
                            alert(`Коробка ${boxBarcode} отсканирована`);
                            setPickupStep(2);
                          }}
                          className="w-full bg-purple-600 hover:bg-purple-700 rounded-full py-3"
                        >
                          <Icon name="Search" size={16} className="mr-2" />
                          Найти коробку
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'return' && (
            <div className="p-8 text-center text-gray-500">
              Вкладка "Возврат" в разработке
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;