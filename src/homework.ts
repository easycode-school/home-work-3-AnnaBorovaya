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
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function() {
        let originalFuncReturn = originalFunc.apply(this);
        originalFuncReturn.data = new Date;
        originalFuncReturn.info =  originalFuncReturn.name + '-' + originalFuncReturn.price;
        return originalFuncReturn
    }
}

class Item {
    public price: number;
    public name: string;

    /**
     *  constructor - метод для инициализации переменных при создании экземпляра класса
     * @param name string
     * @param price number
     */
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    /**
     * getItemInfo - декорируемый метод возвращающий объект
     */
    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

/**Задача №2 */
/**
 * @param type string
 * addPropertyUser - функция-декоратор класса принимает значение переданное при вызове декоратора
 * и добавляет поля createDate и type к декорируемому классу User
 */
function addPropertyUser(type: string) {
    return function (targetclass) {
        return class {
            public createDate: Date = new Date;
            public type: string = type;
        }
    }
}

@addPropertyUser('Admin')
class User {

}

/**Задача №3 */
// News api USA
namespace USA {
    
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url';
        public getNews() {}; // method
    }
}


// News api Ukraine
namespace Ukraine {

    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url';
        public getNews() {}; // method get all news
        public addToFavorite() {}; // method add to favorites
    }
}

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

class Senior implements Junior, Middle {
    createArchitecture(): void {
        console.log('Own function');
    };
    createApp(): void {};
    doTasks(): void {};
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
function applyMixins(targetClass: any, baseClasses: any[]) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName]
        });
    });
}






