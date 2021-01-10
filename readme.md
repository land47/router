## Роутер
Продвинутый и легковесный (2.7kB) роутер для приложений, написанных на основе
[VKUI](https://github.com/VKCOM/VKUI).

## Содержание
- <a href='#примеры-приложений'>Примеры приложений</a>
- <a href='#установка'>Установка</a>
- <a href='#структура-приложения'>Структура приложения</a>
- <a href='#управление-навигацией'>Управление навигацией</a>
- <a href='#управление-снэкбарами'>Управление снэкбарами</a>
- <a href='#управление-модальными-окнами'>Управление модальными окнами</a>
- <a href='#управление-всплывающими-окнами'>Управление всплывающими окнами</a>
- <a href='#передача-параметров'>Передача параметров</a>
- <a href='#передача-асинхронных-параметров'>Передача асинхронных параметров</a>
- <a href='#кэширование-параметров'>Кэширование параметров</a>
- <a href='#работа-с-хэшем'>Работа с хэшем</a>
- <a href='#доступ-к-навигатору'>Доступ к навигатору</a>

## Примеры приложений
...

## Установка
`yarn add @unexp/router` или `npm i @unexp/router` 

**Важно:** так же необходимо установить [`peerDependencies`](https://github.com/land47/router/blob/master/package.json#L32).

## После установки
После установки приложение необходимо обернуть в компонент-провайдер `Router`:
```jsx
// ...imports
import { Router } from '@unexp/router'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

## Структура приложения
У каждого приложения, использующего `VKUI` имееется своя структура. Для её установки в роутере
реализован хук `useStructure`. Он возвращает текущее состояние навигации и обновляет его при
переходе на новое.

Пример:
```jsx
// ...imports
import { useStructure } from '@unexp/router'

export function App() {
  let { view, panel, popout } = useStructure({ view: 'home', panel: 'main' })

  return (
    <Root popout={popout} activeView={view}>
      <View id='home' activePanel={panel}>
        <Panel id='main'>...</Panel>
      </View>

      <View id='settings' activePanel={panel}>
        <Panel id='main'>...</Panel>
        <Panel id='choose_country'>...</Panel>
      </View>
    </Root>
  )
}
```

Описание принимаемого объекта: 
| Свойство      | Тип                  | Описание            |
| ------------- | -------------------- | ------------------- |
| panel         | string, необязателен | id начального panel |
| view          | string, необязателен | id начального view  |
| story         | string, необязателен | id начального story |

**Важно:** структура приложения должна быть определена лишь один раз.

Описание возвращаемого объекта (объект <a id='structure'>Structure</a>):
| Свойство      | Тип                  | Описание                         |
| ------------- | -------------------- | -------------------------------- |
| panel         | string, undefined    | id текущего panel                |
| view          | string, undefined    | id текущего view                 |
| story         | string, undefined    | id текущего story                |
| modal         | string, null         | id текущего modal                |
| popout        | ReactNode            | Открытое сейчас всплывающее окно |

## Управление навигацией
Интерфейс для управления навигацией предоставляет хук `useRouter`. В этом разделе описаны его
методы. 

#### push
Метод `push` позволяет добавлять новое состояние навигации в историю. Первым аргументом он принимает
объект <a href='#structure'>Structure</a>, а вторым аргументом (передавать его необязательно)
<a href='#передача-параметров'>объект параметров</a>.

```jsx
// ...imports
import { useRouter } from '@unexp/router'

export function Main() {
  let { push } = useRouter()  

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
import { useRouter } from '@unexp/router'

export function Settings() {
  let { back } = useRouter()  

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
В отличии метода `push`, метод `replace` заменяет текущее состояние навигации.
```jsx
// ...imports
import { useRouter } from '@unexp/router'

export function Settings() {
  let { replace } = useRouter()

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
import { useRouter } from '@unexp/router'

export function About() {
  let { go } = useRouter()  

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

**Немного подробностей:** при переходе на новое состояние навигации снэкбар закрывается.
```jsx
// ...imports
import { useSnackbar } from '@unexp/router'

export function Home() {
  let { setSnackbar, closeSnackbar } = useSnackbar()  

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
export function App() {
  let { modal } = useStructure({ panel: 'main' })
  let { push, back } = useRouter()

  return (
    <View
      activePanel='main'
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

Возвращаемый им объект:
| Метод         | Описание                      | Аргументы                           |
| ------------- | ----------------------------- | ----------------------------------- |
| setPopout     | Устаналивает всплывающее окно | popout: ReactNode, options: Options |
| closePopout   | Закрывает всплывающее окно    | нет                                 |

Описание объекта Options:
| Свойство             | Описание                                               |
| -------------------- | ------------------------------------------------------ |
| handleBackButton     | Нужно ли закрывать всплывающее окно при переходе назад |

Пример обработки всплывающих окон:
```jsx
export function App() {
  let { popout } = useStructure({ panel: 'main' })
  let { setPopout, closePopout } = usePopout()

  return (
    <View popout={popout} activePanel='main'>
      <Panel id='main'>
        <PanelHeader>Роутер</PanelHeader>
        <SimpleCell
          onClick={() => {
            setPopout(<ScreenSpinner />, { handleBackButton: false })
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


## Передача параметров

Иногда требуется передать какие-либо данные о новом состоянии навигации. Например, мы хотим реализовать панель
`Product`, которая может отображать различные продукты.

Чтобы передать параметры, методы `push` и `replace`, полученные с помощью хука `useRouter`, принимают вторым
аргументом объект.
```jsx
// ...imports
import { useRouter } from '@unexp/router'

export function Home() {
  let { push } = useRouter()  

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
import { useParams } from '@unexp/router'

export function Product() {
  let { productId } = useParams() 

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
import { useRouter } from '@unexp/router'

export function Home() {
  let { push } = useRouter()  

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
**Очень важно:** стоит обратить внимание на то, что в этом случае функция не вызывается. Мы передаём
лишь ссылку на неё. При этом при получении параметров с помощью хука `useParams` на месте `user`
будет результат вызова функции.

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

Все три примера будут корректно обработаны.

![](https://i.ibb.co/W59pZZC/hash.gif)

## Доступ к навигатору
Обычно вам не потребуется получать доступ до навигатора, но пакет предоставляет такую
возможность.

Получение навигатора:
```jsx
// ...imports
import { useNavigator } from '@unexp/router'

export function App() {
  let navigator = useNavigator()

  useEffect(() => {
    navigator.createListener(['panel'], ({ panel }) => 
      console.log(`Переход на панель ${panel}`)
    )
  }, [])

  return (
    <View>...</View>
  )
}
```

<a href='https://github.com/land47/router/blob/master/base/Navigator.ts'>
API навигатора можно посмотреть здесь.
</a>

## Лицензия
<a href='https://choosealicense.com/licenses/mit/'>MIT</a>
