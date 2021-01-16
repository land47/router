## Роутер
Продвинутый и легковесный (~2kB) роутер для приложений, написанных на основе
[VKUI](https://github.com/VKCOM/VKUI).

[![gzip size](http://img.badgesize.io/https://unpkg.com/@unexp/router@0.0.20/dist/index.modern.js)](https://unpkg.com/@unexp/router@0.0.20/dist/index.modern.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/@unexp/router@0.0.20/dist/index.modern.js?compression=brotli)](https://unpkg.com/@unexp/router@0.0.20/dist/index.modern.js)

## Содержание
- <a href='#установка'>Установка</a>
- <a href='#подготовка'>Подготовка</a>
- <a href='#определение-структуры'>Определение структуры</a>
- <a href='#управление-навигацией'>Управление навигацией</a>
- <a href='#управление-снэкбарами'>Управление снэкбарами</a>
- <a href='#управление-модальными-окнами'>Управление модальными окнами</a>
- <a href='#управление-всплывающими-окнами'>Управление всплывающими окнами</a>
- <a href='#обработка-свайпбеков'>Обработка iOS SwipeBack</a>
- <a href='#передача-параметров'>Передача параметров</a>
- <a href='#передача-асинхронных-параметров'>Передача асинхронных параметров</a>
- <a href='#кэширование-параметров'>Кэширование параметров</a>
- <a href='#работа-с-хэшем'>Работа с хэшем</a>
- <a href='#справочник-api'>Справочник API</a>
  - <a href='#router'>Router</a>
  - <a href='#usestructure'>useStructure</a>
  - <a href='#userouter'>useRouter</a>
  - <a href='#useparams'>useParams</a>
  - <a href='#usesnackbar'>useSnackbar</a>
  - <a href='#usepopout'>usePopout</a>
  - <a href='#useswipeback'>useSwipeBack</a>
  - <a href='#uselocation'>useLocation</a>
  - <a href='#usehistory'>useHistory</a>
- <a href='#лицензия'>Лицензия</a>

## Установка
`yarn add @unexp/router` или `npm i @unexp/router` 

## Подготовка
После установки приложение необходимо обернуть в компонент-провайдер `Router`:
```jsx
// ...imports
import {Router} from '@unexp/router'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

## Определение структуры
У каждого приложения на `VKUI` есть своя структура. Роутер реализует хук <a href='#usestructure'>useStructure</a>, с помощью
которого можно установить начальную структуру, и которая будет обновлятся при переходе на другие
панели.


Пример использования:
```jsx
// ...imports
import {useStructure} from '@unexp/router'

export function App() {
  let structure = useStructure({ view: 'home', panel: 'main' })

  return (
    <Root popout={structure.popout} activeView={structure.view}>
      <View id='home' activePanel={structure.panel}>
        <Panel id='main'>...</Panel>
      </View>

      <View id='settings' activePanel={structure.panel}>
        <Panel id='main'>...</Panel>
        <Panel id='choose_country'>...</Panel>
      </View>
    </Root>
  )
}
```

**Важно:** структура приложения должна быть определена лишь один раз.

## Управление навигацией
Интерфейс для управления навигацией предоставляет хук `useRouter`. В этом разделе описаны его
методы. 

#### push
Метод `push` позволяет добавлять новое состояние навигации в историю. Первым аргументом нужно
передать следующее состояние навигации в виде объекта:

| Свойство      | Тип                           | Описание                            |
| ------------- | ----------------------------- | ----------------------------------- |
| panel         | string (необязателен)         | id активной панели                  |
| view          | string (необязателен)         | id активного вью                    |
| story         | string (необязателен)         | id активной story                   |
| modal         | string (необязателен)         | id активного модального окна        |

Вторым аргументом метод может принимать <a href='#передача-параметров'>объект параметров</a>.

Пример использования:
```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function Main() {
  let {push} = useRouter()  

  return (
    <Panel>
      <PanelHeader>Роутер</PanelHeader>

      <SimpleCell onClick={() => push({ panel: 'settings' })}>
        Перейти к настройкам
      </SimpleCell>
    </Panel>
  )
}
```

![](https://i.ibb.co/yf7F2VT/push.gif)

#### back
Метод `back` позволяет перейти на прошлое состояние навигации.
```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function Settings() {
  let {back} = useRouter()  

  return (
    <Panel>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        Настройки
      </PanelHeader>
    </Panel>
  )
}
```

![](https://i.ibb.co/0J62Lkm/back.gif)

#### replace
В отличии метода `push`, метод `replace` заменяет текущее состояние навигации. В остальном их
API не отличается.
```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function Settings() {
  let {replace} = useRouter()

  return (
    <Panel>
      <PanelHeader>Настройки</PanelHeader>

      <SimpleCell onClick={() => replace({ panel: 'about' })}>
        Заменить текущую панель на панель «about»
      </SimpleCell>
    </Panel>
  )
}
```

![](https://i.ibb.co/dr19jbL/replace.gif)

#### go
Метод `go` позволяет выполнить переход на определенное состояние навигации в истории. С его помощью можно перемещаться как
вперед, так и назад, в зависимости от значения переданного параметра.
```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function About() {
  let {go} = useRouter()  

  return (
    <Panel>
      <SimpleCell onClick={() => go(2)}>
        Перейти вперёд на 2 записи
      </SimpleCell>
  
      <SimpleCell onClick={() => go(-1)}>
        Перейти назад
      </SimpleCell>
    </Panel>
  )
}
```

## Управление снэкбарами
Для показа коротких сообщений в нижней части экрана (снэкбаров) реализован хук `useSnackbar`.

```jsx
// ...imports
import {useSnackbar} from '@unexp/router'

export function Home() {
  let {setSnackbar, closeSnackbar} = useSnackbar()  

  function showError() {
    setSnackbar(
      <Snackbar onClose={closeSnackbar}>Произошла ошибка</Snackbar>
    )
  }

  return (
    <Panel>
      <PanelHeader>Снэкбары</PanelHeader>

      <SimpleCell onClick={showError}>
        Показать сообщение об ошибке
      </SimpleCell>
    </Panel>
  )
}
```

![](https://i.ibb.co/T8MNvKk/snackbars-2.gif)

## Управление модальными окнами
Вызов модального окна ничем не отличается от <a href='#push'>перехода на другую
страницу</a>. Для закрытия модального окна необходимо вызвать метод <a href='#back'>back</a>.

Пример обработки модальных окон:
```jsx
// ...imports
import {useStructure, useRouter} from '@unexp/router'

export function App() {
  let {modal, panel} = useStructure({ panel: 'main' })
  let {push, back} = useRouter()

  return (
    <View
      activePanel={panel}
      modal={
        <ModalRoot activeModal={modal} onClose={back}>
          <ModalCard id='info' onClose={back}>...</ModalCard>
        </ModalRoot>
      }>
      <Panel id='main'>
        <PanelHeader>Роутер</PanelHeader>
        <SimpleCell onClick={() => push({ modal: 'info' })}>
          Открыть модальное окно
        </SimpleCell>
      </Panel>
    </View>
  )
}
```

![](https://i.ibb.co/wrxQrgQ/modals-2.gif)

## Управление всплывающими окнами
Для обработки [всплывающих окон](https://vkcom.github.io/VKUI/#section-popouts) реализован хук
`usePopout`.

Возвращаемый объект:

| Метод         | Описание                      | Аргументы                           |
| ------------- | ----------------------------- | ----------------------------------- |
| setPopout     | Устаналивает всплывающее окно | popout: ReactNode                   |
| closePopout   | Закрывает всплывающее окно    | нет                                 |

Пример обработки всплывающих окон:
```jsx
// ...imports
import {useStructure, usePopout} from '@unexp/router'

export function App() {
  let {popout, panel} = useStructure({ panel: 'main' })
  let {setPopout, closePopout} = usePopout()

  return (
    <View popout={popout} activePanel={panel}>
      <Panel id='main'>
        <PanelHeader>Роутер</PanelHeader>
        <SimpleCell
          onClick={() => {
            setPopout(<ScreenSpinner />)
            setTimeout(closePopout, 1000)
          }}>
          Показать спиннер
        </SimpleCell>

        <SimpleCell
          onClick={() =>
            setPopout(
              <Alert
                actions={[
                  {title: 'Лишить права', mode: 'destructive', autoclose: true},
                  {title: 'Отмена', autoclose: true, mode: 'cancel'},
                ]}
                actionsLayout='vertical'
                onClose={closePopout}
                header='Подтвердите действие'
                text='Вы уверены, что хотите лишить пользователя права на модерацию контента?'
              />
            )
          }>
          Показать уведомление
        </SimpleCell>
      </Panel>
    </View>
  )
}
```

![](https://i.ibb.co/M2SV2rH/spinner.gif) ![](https://i.ibb.co/mhc20Gh/alert.gif)

## Обработка свайпбеков
В iOS есть возможность свайпнуть от левого края назад, чтобы перейти на предыдущую панель. Для
обработки свайпбеков достаточно вызовать хук `useSwipeBack` и прокинуть возвращаемый им объект
нужной (или всем) вью.

Пример:
```jsx
// ...imports
import {useStructure, useSwipeBack} from '@unexp/router'

export function App() {
  let {view, panel} = useStructure({ view: 'home', panel: 'main' })
  let withSwipeBack = useSwipeBack()

  return (
    <Root activeView={view}>
      <View {...withSwipeBack} id='home' activePanel={panel}>
        [panels]
      </View>

      <View {...withSwipeBack} id='about' activePanel={panel}>
        [panels]
      </View>
    </Root>
  )
}
```

Отлично, теперь роутер автоматически подставит нужные значения нужной вью для корректной обработки
свайпбеков.

![](https://i.ibb.co/VpxNXFM/swipeback-2.gif)

## Передача параметров

Иногда требуется передать какие-либо данные о новом состоянии навигации. Например, мы хотим реализовать панель
`Product`, которая может отображать различные продукты.

Чтобы передать параметры, методы `push` и `replace`, полученные с помощью хука `useRouter`, принимают вторым
аргументом объект.
```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function Home() {
  let {push} = useRouter()  

  return (
    <Panel>
      <SimpleCell onClick={() => push({ panel: 'product' }, { productId: 1 })}>
        Перейти к продукту #1
      </SimpleCell>
      <SimpleCell onClick={() => push({ panel: 'product' }, { productId: 132 })}>
        Перейти к продукту #132
      </SimpleCell>
    </Panel>
  )
}
```

И наконец, чтобы получить параметры о текущей записи, мы можем использовать хук `useParams`.
```jsx
// ...imports
import {useParams} from '@unexp/router'

export function Product() {
  let {productId} = useParams() 

  return (
    <Panel>
      <PanelHeader>Продукт #{productId}</PanelHeader>
    </Panel>
  )
}
```

![](https://i.ibb.co/N9dSDJQ/products.gif)

## Передача асинхронных параметров
Есть несколько способов передать асинхронные параметры. Рассмотрим единственно верный:

```jsx
// ...imports
import {useRouter} from '@unexp/router'

export function Home() {
  let {push} = useRouter()  

  async function fetchUser() {
    // Функция возвращает промис
  }

  return (
    <Panel id={id}>
      <SimpleCell
        onClick={() => push({ panel: 'profile' }, { user: fetchUser })} // <--
      >
        Перейти в профиль
      </SimpleCell>
    </Panel>
  )
}
```
Стоит обратить внимание на то, что в этом случае функция не вызывается. Мы передаём
лишь ссылку на неё. При этом при получении параметров с помощью хука `useParams` на месте `user`
будет результат вызова функции.

Чтобы это не казалось магией, объясняю шаги, которые проделает метод `push` в данном случае.

1. Вызовет функцию fetchUser.
2. Подождёт завершения промиса.
3. Добавит запись в историю.

```typescript
{ user: fetchUser } -> { user: Promise<{ ... }> } -> { user: { ... } }
```

## Кэширование параметров
Крутая и интересная фича моего роутера – кэширование параметров. Она отлично сочетается с асинхронными
параметрами. Модифицируем пример, предоставленный выше:

```jsx
// ...imports
import { useRouter } from '@unexp/router'

export function Home() {
  let { push } = useRouter()  

  async function fetchUser() {
    // Функция возвращает промис
  }

  return (
    <Panel>
      <SimpleCell
        onClick={() => push({ panel: 'profile' }, { user: fetchUser, key: 'myKey' })} // <--
      >
        Перейти в профиль
      </SimpleCell>
    </Panel>
  )
}
```
Мы добавили уникальный ключ параметрам (свойство `key`). Таким образом после первого вызова функции `fetchUser` её
значение будет закешировано. Это означает, что при каждом следующем переходе на панель `profile` с ключом `myKey` 
пользователю не придётся ждать повторного выполнения функции `fetchUser`.

В примере ниже видно, что функция `fetchUser` вызывается лишь один раз. При последующих переходах на панель `profile` с
ключом `myKey` параметры будут браться из кэша.

![a](https://s8.gifyu.com/images/wtf3.gif)


## Работа с хэшем
Роутер уже умеет обрабатывать хеш, переданный в ссылке на ваше приложение.

- vk.com/app123#panel=home
- vk.com/app123#view=home&panel=main
- vk.com/app123#story=story_id&view=view_id&panel=panel_id

Все три примера будут корректно обработаны. Вы также можете передавать параметры для состояния.

Например, при переходе по такой ссылке откроется панель `about`.
- vk.com/app123#panel=about&hash=000&id=123

А объект, полученный с помощью <a href='#useparams'>useParams</a>, будет таким:
```typescript
{ hash: "000", id: "123" }
```

![](https://i.ibb.co/W59pZZC/hash.gif)

## Справочник API

### Router
Компонент-провайдер, в который обязательно оборачивать ваше приложение. Если вы этого не сделаете, 
то увидите соответствующую ошибку.

### useStructure
С помощью этого хука определяется структура приложения. Он возвращает объект с текущим состоянием
навигации и обновляет его при изменении (подобно хуку <a href='#uselocation'>useLocation</a>).

Первым аргументом хук принимает начальную структуру приложения:

| Свойство      | Тип                      |
| ------------- | ------------------------ |
| panel         | string (необязателен)    |
| view          | string (необязателен)    |
| story         | string (необязателен)    |

И возвращает объект с текущим состоянием (которое обновляет при изменении):

| Свойство      | Тип                      |
| ------------- | ------------------------ |
| panel         | string                   |
| view          | string                   |
| story         | string                   |
| modal         | string                   |
| popout        | ReactNode                |

### useRouter
Основной хук для осуществления навигации.

### useParams
Возвращает параметры текущей записи. Передавать параметры можно с
помощью хука <a href='#передача-параметров'>useRouter</a>.

### useSnackbar
Возвращает интерфейс для управления снэкбарами. С помощью него можно показывать короткие
сообщения внизу экрана.

### usePopout
Возвращает интерфейс для управления всплывающими окнами (popouts, не путать с модальными)

### useSwipeBack
Возвращает объект, который можно прокинуть любой из `View`. Автоматически определяет историю для
текущей `View` и обрабатывает переход назад.

### useLocation
Возвращает текущее состояние навигации и обновляет при его изменении.

### useHistory
Возвращает историю переходов между состояниями.

## Лицензия
<a href='https://choosealicense.com/licenses/mit/'>MIT</a>
