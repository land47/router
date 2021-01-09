## Роутер
Продвинутый и легковесный (2.7kB) роутер для приложений, написанных на основе
[VKUI](https://github.com/VKCOM/VKUI).

## Примеры приложений
...

## Установка
`npm i @unexp/router` или `yarn add @unexp/router`

**Важно:** после установки пакета необходимо установить нужные ему [`peerDependencies`](https://github.com/land47/router/blob/master/package.json#L32).

## После установки
Приложение необходимо обернуть в компонент-провайдер `Router`:
```jsx
import {render} from 'react-dom'
import {Router} from '@unexp/router'
import App from './App'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

## Структура приложения
У каждого приложения, использующего `VKUI` имееется своя структура. Для её определения пакет предоставляет хук
`useStructure`. Этот хук возвращает текущее состояние навигации и обновляет его при изменении.

Пример:
```jsx
import {useStructure} from '@unexp/router'

export function App() {
  let {view, panel} = useStructure({view: 'home', panel: 'main'})

  return (
    <Root activeView={view}>
      <View id='home' activePanel={panel}>
        <HomeMain id='main' />
      </View>

      <View id='settings' activePanel={panel}>
        <SettingsMain id='main' />
      </View>
    </Root>
  )
}
```

## Управление навигацией
Для перехода на другое состояние навигации необходимо использовать хук `useRouter`. 
#### push
Метод `push` позволяет добавлять новое состояние навигации в историю.
Первым аргументом он принимает объект подобного вида:

| Свойство      | Тип                  |
| ------------- | -------------------- |
| panel         | string, необязателен |
| view          | string, необязателен |
| story         | string, необязателен |
| modal         | string, необязателен |

Вторым аргументом (передавать его необязательно) метод `push` принимает [объект параметров](#passing-params).

```jsx
import {useRouter} from '@unexp/router'

export let Main = memo(function Main({ id }) {
  let {push} = useRouter()  

  return (
    <Panel id={id}>
      <PanelHeader>Роутер</PanelHeader>

      <SimpleCell onClick={() => push({panel: 'settings'})}>
        Перейти к настройкам
      </SimpleCell>
    </Panel>
  )
})
```
#### back
Метод `back` позволяет перейти на прошлое состояние навигации.
```jsx
import {useRouter} from '@unexp/router'

export let Settings = memo(function Settings({ id }) {
  let {back} = useRouter()  

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        Настройки
      </PanelHeader>
      ...
    </Panel>
  )
})
```
#### replace
В отличии метода `push`, метод `replace` заменяет текущее состояние навигации.
```jsx
import {useRouter} from '@unexp/router'

export let Onboarding = memo(function Onboarding({ id }) {
  let {replace} = useRouter()  

  return (
    <Panel id={id}>
      <SimpleCell onClick={() => replace({panel: 'home'})}>
        Завершить обучение
      </SimpleCell>
    </Panel>
  )
})
```
#### go
Метод `go` позволяет выполнить переход на определенное состояние навигации в истории. С его помощью можно перемещаться как
вперед, так и назад, в зависимости от значения переданного параметра.
```jsx
import {useRouter} from '@unexp/router'

export let About = memo(function About({ id }) {
  let {go} = useRouter()  

  return (
    <Panel id={id}>
      <SimpleCell onClick={() => go(2)}>
        Перейти вперёд на 2 записи
      </SimpleCell>
  
      <SimpleCell onClick={() => go(-1)}>
        Перейти назад
      </SimpleCell>
    </Panel>
  )
})
```

## Управление снэкбарами
Для показа коротких сообщений в нижней части экрана (снэкбаров) реализован хук `useSnackbar`.

**Немного подробностей:** при переходе на новое состояние навигации снэкбар закрывается.
```jsx
import {useSnackbar} from '@unexp/router'

export let Home = memo(function Home({ id }) {
  let {setSnackbar, closeSnackbar} = useSnackbar()  

  function showError() {
    setSnackbar(
      <Snackbar onClose={closeSnackbar}>
        Произошла ошибка
      </Snackbar>
    )
  }

  return (
    <Panel id={id}>
      <SimpleCell onClick={showError}>
        Показать сообщение об ошибке
      </SimpleCell>
    </Panel>
  )
})
```

## Управление модальными окнами
...

## Управление всплывающими окнами
...

<h2 id="passing-params">Передача параметров</h2>

Иногда требуется передать какие-либо данные о новом состоянии навигации. Например, мы хотим реализовать панель
`Product`, которая может отображать различные продукты.

Чтобы передать параметры, методы `push` и `replace`, полученные с помощью хука `useRouter`, принимают вторым
аргументом объект.
```jsx
import {useRouter} from '@unexp/router'

export let Home = memo(function Home({ id }) {
  let {push} = useRouter()  

  return (
    <Panel id={id}>
      <SimpleCell onClick={() => push({panel: 'product'}, {productId: 1})}>
        Перейти к продукту #1
      </SimpleCell>
      <SimpleCell onClick={() => push({panel: 'product'}, {productId: 132})}>
        Перейти к продукту #132
      </SimpleCell>
    </Panel>
  )
})
```

И наконец, чтобы получить параметры о текущей записи, мы можем использовать хук `useParams`.
```jsx
import {useParams} from '@unexp/router'

export let Product = memo(function Product({id}) {
  let {productId} = useParams() 

  return (
    <Panel id={id}>
      <PanelHeader>Продукт #{productId}</PanelHeader>
    </Panel>
  )
})
```

## Передача асинхронных параметров
Есть несколько способов передать асинхронные параметры. Рассмотрим единственно верный:
```jsx
import {useRouter} from '@unexp/router'

export let Home = memo(function Home({ id }) {
  let {push} = useRouter()  

  async function fetchUser() {
    // Функция возвращает промис
  }

  return (
    <Panel id={id}>
      <SimpleCell
        onClick={() => push({panel: 'profile'}, { user: fetchUser })}
      >
        Перейти в профиль
      </SimpleCell>
    </Panel>
  )
})
```
**Очень важно:** стоит обратить внимание на то, что в этом случае функция не вызывается. Мы передаём ссылку на неё, а
не результат вызова.



## Кэширование параметров
Крутая и интересная фича моего роутера – кэширование параметров. Она отлично сочетается с асинхронными
параметрами. Модифицируем пример, предоставленный выше:
```jsx
import {useRouter} from '@unexp/router'

export let Home = memo(function Home({ id }) {
  let {push} = useRouter()  

  async function fetchUser() {
    // Функция возвращает промис
  }

  return (
    <Panel id={id}>
      <SimpleCell
        onClick={() => push({panel: 'profile'}, { user: fetchUser, key: 'myKey' })} // <--
      >
        Перейти в профиль
      </SimpleCell>
    </Panel>
  )
})
```
Мы добавили уникальный ключ параметрам (свойство `key`). Таким образом после первого вызова функции `fetchUser` её
значение будет закешировано. Это означает, что при каждом следующем переходе на панель `profile` с ключом `myKey` 
пользователю не придётся ждать повторного выполнения функции `fetchUser`.

В примере ниже видно, что функция `fetchUser` вызывается лишь один раз. При последующих переходах на панель `profile` с
ключом `myKey` параметры будут браться из кэша.

![a](https://s8.gifyu.com/images/wtf3.gif)


## Работа с хэшем
Хук `useStructure` внутри себя обрабатывает хеш, переданный в ссылке на ваше приложение.

- vk.com/app123#panel=home
- vk.com/app123#view=home&panel=main
- vk.com/app123#story=story_id&view=view_id&panel=panel_id

Все эти ссылки будут корректно обработаны роутером.
