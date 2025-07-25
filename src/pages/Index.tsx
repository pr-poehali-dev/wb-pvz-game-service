import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('delivery');
  const [isScanning, setIsScanning] = useState(false);
  const [foundOrder, setFoundOrder] = useState(null);
  const [operationStatus, setOperationStatus] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  // Голосовой помощник Оксана
  const speakMessage = (message) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Голос Оксаны
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru') && voice.name.includes('woman')) || voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) utterance.voice = russianVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  // Симуляция поиска заказа
  const searchOrder = () => {
    if (phoneNumber.length !== 4) return;
    
    setIsScanning(true);
    setTimeout(() => {
      setFoundOrder({
        id: `WB${phoneNumber}${Math.floor(Math.random() * 1000)}`,
        customer: 'Иванов И.И.',
        phone: `+7 (999) 123-${phoneNumber}`,
        items: Math.floor(Math.random() * 3) + 1,
        status: 'ready'
      });
      setIsScanning(false);
      speakMessage('Заказ найден. Подготовьте товар к выдаче.');
    }, 2000);
  };

  // Симуляция QR сканирования
  const simulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomPhone = Math.floor(Math.random() * 9000) + 1000;
      setFoundOrder({
        id: `WB${randomPhone}${Math.floor(Math.random() * 1000)}`,
        customer: 'Петров П.П.',
        phone: `+7 (999) 123-${randomPhone}`,
        items: Math.floor(Math.random() * 3) + 1,
        status: 'ready'
      });
      setIsScanning(false);
      speakMessage('QR-код успешно отсканирован. Заказ готов к выдаче.');
    }, 1500);
  };

  // Операции с заказами
  const handleDelivery = () => {
    setOperationStatus('delivered');
    speakMessage('Товар выдан. Спасибо за покупку! Оцените наш пункт выдачи в приложении Wildberries.');
    setTimeout(() => {
      setFoundOrder(null);
      setOperationStatus('');
      setPhoneNumber('');
    }, 3000);
  };

  const handleReturn = () => {
    setOperationStatus('returned');
    speakMessage('Возврат оформлен. Денежные средства поступят на ваш счёт в течение 3-5 рабочих дней.');
    setTimeout(() => {
      setFoundOrder(null);
      setOperationStatus('');
      setPhoneNumber('');
    }, 3000);
  };

  const handleReceiving = () => {
    setOperationStatus('received');
    speakMessage('Товар принят на склад. Спасибо за работу!');
    setTimeout(() => {
      setFoundOrder(null);
      setOperationStatus('');
      setPhoneNumber('');
    }, 3000);
  };

  useEffect(() => {
    // Инициализация голосового синтеза
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - точная копия */}
      <div className="w-24 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-sm">WB</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 py-4">
          <div className="space-y-2 px-2">
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors rounded-lg">
              <Icon name="Menu" size={20} className="text-gray-600" />
            </button>
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors rounded-lg">
              <Icon name="Package" size={20} className="text-gray-600" />
            </button>
            <button className="w-full p-3 flex justify-center hover:bg-gray-100 transition-colors rounded-lg">
              <Icon name="Search" size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Icon name="User" size={16} className="text-purple-600" />
          </div>
          <div className="text-xs text-gray-500 text-center leading-tight">
            SCANNING<br />
            v1.0.67
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header - точная копия */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Tab Navigation - точно как на картинке */}
            <div className="flex space-x-12">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Выдача
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
                  activeTab === 'rules'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Правила
              </button>
              <button
                onClick={() => setActiveTab('return')}
                className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
                  activeTab === 'return'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Возврат
              </button>
            </div>

            {/* Right Section - точная копия иконок */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={20} className="text-gray-400" />
                <Icon name="Settings" size={20} className="text-gray-400" />
              </div>
              
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">13</span>
              </div>

              <div className="flex items-center space-x-3">
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

        {/* Main Content - центрированное содержимое как на картинке */}
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          {activeTab === 'delivery' && !foundOrder && (
            <div className="max-w-lg w-full text-center px-8">
              {/* Voice Control - скрытый но функциональный */}
              <div className="hidden">
                <Button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name={isVoiceEnabled ? "Volume2" : "VolumeX"} size={16} />
                </Button>
              </div>

              {/* QR Scanner Section - точно как на картинке */}
              <div className="mb-12">
                <h1 className="text-xl text-gray-600 mb-12 font-normal">
                  Отсканируйте QR-код клиента или курьера
                </h1>
                
                <div className="mb-12">
                  <img 
                    src="https://cdn.poehali.dev/files/f76e5ef0-6b0c-43a1-be76-91b87dbdb68d.jpg"
                    alt="QR Scanner Device" 
                    className={`w-56 h-56 mx-auto object-contain cursor-pointer transition-all ${
                      isScanning ? 'animate-pulse filter brightness-110' : ''
                    }`}
                    onClick={simulateQRScan}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="mb-8">
                <span className="text-gray-400 text-sm">или</span>
              </div>

              {/* Phone Input Section - точно как на картинке */}
              <div>
                <h2 className="text-lg text-gray-600 mb-8 font-normal">
                  Введите номер телефона клиента
                </h2>
                
                <div className="space-y-6">
                  <Input
                    type="tel"
                    placeholder="Последние 4 цифры номера"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-center text-lg py-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent font-normal"
                    maxLength={4}
                  />
                  
                  <Button 
                    onClick={searchOrder}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg text-base font-medium"
                    disabled={phoneNumber.length !== 4 || isScanning}
                  >
                    {isScanning ? 'Поиск...' : 'Найти заказ'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Order Found Screen */}
          {activeTab === 'delivery' && foundOrder && (
            <div className="max-w-2xl mx-auto px-8">
                  <Card className="bg-white shadow-xl border-2 border-green-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      <CardTitle className="flex items-center justify-center gap-2 text-xl">
                        <Icon name="Package" size={24} />
                        Заказ найден
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Номер заказа:</span>
                          <span className="font-bold text-lg">{foundOrder.id}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Клиент:</span>
                          <span className="font-bold">{foundOrder.customer}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Телефон:</span>
                          <span className="font-bold">{foundOrder.phone}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Количество товаров:</span>
                          <Badge variant="secondary" className="text-lg px-3 py-1">
                            {foundOrder.items} шт.
                          </Badge>
                        </div>
                      </div>

                      {operationStatus ? (
                        <div className="text-center py-8">
                          {operationStatus === 'delivered' && (
                            <div className="text-green-600">
                              <Icon name="CheckCircle" size={64} className="mx-auto mb-4" />
                              <h3 className="text-2xl font-bold mb-2">Товар выдан!</h3>
                              <p>Спасибо за покупку!</p>
                            </div>
                          )}
                          {operationStatus === 'returned' && (
                            <div className="text-blue-600">
                              <Icon name="RotateCcw" size={64} className="mx-auto mb-4" />
                              <h3 className="text-2xl font-bold mb-2">Возврат оформлен!</h3>
                              <p>Средства поступят в течение 3-5 дней</p>
                            </div>
                          )}
                          {operationStatus === 'received' && (
                            <div className="text-purple-600">
                              <Icon name="Package" size={64} className="mx-auto mb-4" />
                              <h3 className="text-2xl font-bold mb-2">Товар принят!</h3>
                              <p>Товар успешно принят на склад</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button 
                            onClick={handleDelivery}
                            className="bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold"
                          >
                            <Icon name="Package" size={20} className="mr-2" />
                            Выдать товар
                          </Button>
                          
                          <Button 
                            onClick={handleReturn}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-bold"
                          >
                            <Icon name="RotateCcw" size={20} className="mr-2" />
                            Оформить возврат
                          </Button>
                          
                          <Button 
                            onClick={handleReceiving}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-bold"
                          >
                            <Icon name="Package" size={20} className="mr-2" />
                            Принять товар
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="max-w-2xl w-full px-8">
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
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Голосовой помощник Оксана</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Озвучивает все этапы работы с заказами</li>
                      <li>• Напоминает об оценке пункта выдачи</li>
                      <li>• Работает автоматически при операциях</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Return Tab */}
          {activeTab === 'return' && (
            <div className="max-w-2xl w-full px-8">
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