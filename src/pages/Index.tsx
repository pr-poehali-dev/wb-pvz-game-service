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
            <div className="max-w-4xl w-full">
              {!foundOrder ? (
                <div className="text-center">
                  {/* Voice Control */}
                  <div className="mb-6 flex justify-center">
                    <Button
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                      variant={isVoiceEnabled ? "default" : "outline"}
                      className="flex items-center gap-2"
                    >
                      <Icon name={isVoiceEnabled ? "Volume2" : "VolumeX"} size={16} />
                      {isVoiceEnabled ? "Оксана включена" : "Оксана отключена"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* QR Scanner */}
                    <Card className="bg-white shadow-lg border border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        <CardTitle className="flex items-center justify-center gap-2">
                          <Icon name="QrCode" size={24} />
                          QR-Сканер
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 text-center">
                        <div className="mb-6">
                          <img 
                            src="https://cdn.poehali.dev/files/b6a7e05f-173d-4642-af99-b27bc7f53fcd.jpg"
                            alt="QR Scanner Device" 
                            className={`w-48 h-48 mx-auto object-contain transition-all ${
                              isScanning ? 'animate-pulse border-4 border-purple-500 rounded-lg' : ''
                            }`}
                          />
                        </div>
                        <h3 className="text-lg text-gray-700 mb-4">
                          Отсканируйте QR-код клиента или курьера
                        </h3>
                        <Button 
                          onClick={simulateQRScan}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                          disabled={isScanning}
                        >
                          {isScanning ? (
                            <>
                              <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                              Сканирование...
                            </>
                          ) : (
                            <>
                              <Icon name="Camera" size={16} className="mr-2" />
                              Активировать сканер
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Phone Input */}
                    <Card className="bg-white shadow-lg border border-gray-200">
                      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <CardTitle className="flex items-center justify-center gap-2">
                          <Icon name="Phone" size={24} />
                          Поиск по номеру
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="text-center mb-6">
                          <h3 className="text-lg text-gray-700 mb-2">или</h3>
                          <p className="text-gray-600">Введите номер телефона клиента</p>
                        </div>
                        
                        <div className="space-y-4">
                          <Input
                            type="tel"
                            placeholder="Последние 4 цифры номера"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full text-center text-xl font-mono py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            maxLength={4}
                          />
                          
                          <Button 
                            onClick={searchOrder}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
                            disabled={phoneNumber.length !== 4 || isScanning}
                          >
                            {isScanning ? (
                              <>
                                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                                Поиск...
                              </>
                            ) : (
                              <>
                                <Icon name="Search" size={20} className="mr-2" />
                                Найти заказ
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                /* Order Found */
                <div className="max-w-2xl mx-auto">
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
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Голосовой помощник Оксана</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Озвучивает все этапы работы с заказами</li>
                      <li>• Напоминает об оценке пункта выдачи</li>
                      <li>• Можно отключить/включить в любой момент</li>
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