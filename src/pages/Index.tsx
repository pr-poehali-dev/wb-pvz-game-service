import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('delivery');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-mono">
      {/* Header */}
      <header className="bg-white border-b-4 border-purple-500 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider text-black">WB PVZ</h1>
              <p className="text-sm text-gray-600 tracking-wide">GAMING HUB</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Icon name="User" size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">Профиль</span>
            </div>
            <div className="relative">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                13
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg">
              <Icon name="Download" size={16} className="mr-2" />
              Установить версию
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl p-1 shadow-lg border-2 border-gray-200">
            <TabsTrigger 
              value="delivery" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white font-bold tracking-wide px-8 py-3 rounded-lg transition-all"
            >
              <Icon name="Package" size={20} className="mr-2" />
              Выдача
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white font-bold tracking-wide px-8 py-3 rounded-lg transition-all"
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Правила
            </TabsTrigger>
            <TabsTrigger 
              value="return" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white font-bold tracking-wide px-8 py-3 rounded-lg transition-all"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Возврат
            </TabsTrigger>
          </TabsList>

          {/* Delivery Tab Content */}
          <TabsContent value="delivery" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* QR Scanner */}
              <Card className="bg-white shadow-xl border-4 border-gray-200 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
                  <CardTitle className="text-xl font-bold tracking-wide flex items-center justify-center gap-2">
                    <Icon name="QrCode" size={24} />
                    QR-СКАНЕР
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src="/img/544bcf06-f45a-4bbd-8465-61ed2a05ec7f.jpg" 
                      alt="QR Scanner" 
                      className="w-48 h-48 mx-auto rounded-xl border-4 border-gray-300 shadow-lg object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-purple-500 rounded-xl animate-pulse"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-wide">
                    Отсканируйте QR-код клиента или курьера
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Наведите камеру на QR-код для быстрой обработки заказа
                  </p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg">
                    <Icon name="Camera" size={16} className="mr-2" />
                    Активировать камеру
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Input */}
              <Card className="bg-white shadow-xl border-4 border-gray-200 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
                  <CardTitle className="text-xl font-bold tracking-wide flex items-center justify-center gap-2">
                    <Icon name="Phone" size={24} />
                    ВВОД НОМЕРА
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-wide">или</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Введите номер телефона клиента
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      type="tel"
                      placeholder="Последние 4 цифры номера"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-center text-xl font-bold tracking-widest border-4 border-gray-200 rounded-lg p-4 focus:border-purple-500"
                      maxLength={4}
                    />
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg shadow-lg text-lg tracking-wide"
                      disabled={phoneNumber.length !== 4}
                    >
                      <Icon name="Search" size={20} className="mr-2" />
                      НАЙТИ ЗАКАЗ
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      💡 Введите последние 4 цифры номера телефона клиента для поиска заказа
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-300 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Icon name="Leaf" size={48} className="mx-auto mb-4 text-green-600" />
                  <h3 className="font-bold text-green-800 text-lg mb-2">РАСТЕНИЯ</h3>
                  <p className="text-green-700 text-sm">Защищайте свой сад от зомби-курьеров</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-4 border-orange-300 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Icon name="Zap" size={48} className="mx-auto mb-4 text-orange-600" />
                  <h3 className="font-bold text-orange-800 text-lg mb-2">БОЕВАЯ СИСТЕМА</h3>
                  <p className="text-orange-700 text-sm">Уничтожайте зомби и защищайте заказы</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-purple-300 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Icon name="Trophy" size={48} className="mx-auto mb-4 text-purple-600" />
                  <h3 className="font-bold text-purple-800 text-lg mb-2">ДОСТИЖЕНИЯ</h3>
                  <p className="text-purple-700 text-sm">Разблокируйте новые растения и награды</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rules Tab Content */}
          <TabsContent value="rules" className="mt-8">
            <Card className="bg-white shadow-xl border-4 border-gray-200 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="text-2xl font-bold tracking-wide text-center">
                  ПРАВИЛА ИГРЫ WB PVZ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <Icon name="Target" size={24} className="text-green-600" />
                      Основные правила
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-1" />
                        Сканируйте QR-коды для обработки заказов
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-1" />
                        Защищайте склад от зомби-курьеров
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-1" />
                        Размещайте растения для обороны
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-1" />
                        Собирайте солнечную энергию для покупок
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <Icon name="Award" size={24} className="text-purple-600" />
                      Система очков
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 mt-1" />
                        +100 очков за каждый обработанный заказ
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 mt-1" />
                        +50 очков за уничтоженного зомби
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 mt-1" />
                        +25 очков за собранную солнечную энергию
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 mt-1" />
                        Бонусы за комбо-атаки
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Return Tab Content */}
          <TabsContent value="return" className="mt-8">
            <Card className="bg-white shadow-xl border-4 border-gray-200 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                <CardTitle className="text-2xl font-bold tracking-wide text-center">
                  СИСТЕМА ВОЗВРАТОВ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Icon name="RotateCcw" size={64} className="mx-auto mb-4 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Обработка возвратов</h3>
                  <p className="text-gray-600">
                    Быстрая и удобная система для обработки возвращенных товаров
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-red-200 bg-red-50">
                    <CardContent className="p-4 text-center">
                      <Icon name="QrCode" size={32} className="mx-auto mb-2 text-red-600" />
                      <h4 className="font-bold text-red-800 mb-1">1. Сканирование</h4>
                      <p className="text-red-700 text-sm">Отсканируйте QR-код возврата</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-orange-200 bg-orange-50">
                    <CardContent className="p-4 text-center">
                      <Icon name="FileCheck" size={32} className="mx-auto mb-2 text-orange-600" />
                      <h4 className="font-bold text-orange-800 mb-1">2. Проверка</h4>
                      <p className="text-orange-700 text-sm">Проверьте состояние товара</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-4 text-center">
                      <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-green-600" />
                      <h4 className="font-bold text-green-800 mb-1">3. Подтверждение</h4>
                      <p className="text-green-700 text-sm">Завершите процесс возврата</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} className="text-blue-500" />
                    Важная информация
                  </h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Возврат возможен в течение 14 дней с момента получения</li>
                    <li>• Товар должен быть в оригинальной упаковке</li>
                    <li>• Средства возвращаются в течение 3-5 рабочих дней</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;