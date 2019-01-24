var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**Задача №1 */
/**
 * @param target Object
 * @param method string
 * @param descriptor PropertyDescriptor
 * addItemInfoDecorator - функция декоратор метода, которая записывает оригинальныую функцию в переменную
 * затем реализация оригинальной функции заменяется. В данной реализации вызывается
 * оригинальная функция и результат присваивается в переменную. Затем в данный результат
 * записываються два поля data и info
 */
function addItemInfoDecorator(target, method, descriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function () {
        let originalFuncReturn = originalFunc.apply(this);
        originalFuncReturn.data = new Date;
        originalFuncReturn.info = originalFuncReturn.name + '-' + originalFuncReturn.price;
        return originalFuncReturn;
    };
}
class Item {
    /**
     *  constructor - метод для инициализации переменных при создании экземпляра класса
     * @param name string
     * @param price number
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    /**
     * getItemInfo - декорируемый метод возвращающий объект
     */
    getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}
__decorate([
    addItemInfoDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Item.prototype, "getItemInfo", null);
let item = new Item('Apple', 100);
console.log(item.getItemInfo());
/**Задача №2 */
/**
 * @param type string
 * addPropertyUser - функция-декоратор класса принимает значение переданное при вызове декоратора
 * и добавляет поля createDate и type к декорируемому классу User
 */
function addPropertyUser(type) {
    return function (targetclass) {
        return class {
            constructor() {
                this.createDate = new Date;
                this.type = type;
            }
        };
    };
}
let User = class User {
};
User = __decorate([
    addPropertyUser('Admin')
], User);
/**Задача №3 */
// News api USA
var USA;
(function (USA) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_usa_url';
        }
        getNews() { }
        ; // method
    }
    USA.NewsService = NewsService;
})(USA || (USA = {}));
// News api Ukraine
var Ukraine;
(function (Ukraine) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_2_url';
        }
        getNews() { }
        ; // method get all news
        addToFavorite() { }
        ; // method add to favorites
    }
    Ukraine.NewsService = NewsService;
})(Ukraine || (Ukraine = {}));
/**Задача №4 */
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}
class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}
class Senior {
    createArchitecture() {
        console.log('Own function');
    }
    ;
    createApp() { }
    ;
    doTasks() { }
    ;
}
/**
 * @param Senior object
 * @param [Junior, Middle] Array
 * applyMixins - функция которая присваивает методы дочерних классов в методы родительского класса
 * Перебирает массив классов-доноров. На каждой итерации у каждого массива забирает название свойства
 * и присваивает в свойства-методы с данным названием прототипа класса наследника
 * реализации методов  прототипа с данным названием классов доноров
 */
applyMixins(Senior, [Junior, Middle]);
function applyMixins(targetClass, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}
