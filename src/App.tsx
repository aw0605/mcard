import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from '@shared/Alert'
import { useAlertContext } from '@contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <>
      <div>
        <Text typography="t1" display="block">
          t1
        </Text>
        <Text typography="t2" color="red">
          t2
        </Text>
        <Text typography="t3">t3</Text>
        <Text typography="t4">t4</Text>
        <Text typography="t5">t5</Text>
      </div>

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />

      <Button>클릭</Button>
      <Button color="success">클릭</Button>
      <Button color="error">클릭</Button>
      <Button color="success" weak={true}>
        클릭
      </Button>
      <Button color="error" weak={true}>
        클릭
      </Button>
      <Button full={true}>클릭</Button>
      <Button full={true} disabled={true}>
        클릭1
      </Button>

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />

      <Input placeholder="아이디" aria-invalid={false} />
      <Input placeholder="비밀번호" aria-invalid={true} />

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <TextField label="아이디" />
      <TextField label="비밀번호" hasError={true} />

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      {/* <Alert
        open={true}
        title="알림이 떴습니다."
        description="안녕하세요"
        onBtnClick={() => {
          console.log('확인')
        }}
      /> */}
      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인하실 수 있습니다.',
            onBtnClick: () => {
              console.log('확인')
            },
          })
        }}
      >
        Alert오픈
      </Button>

      <Button
        onClick={() => {
          open({
            title: '카드신청완료2',
            description: '내역페이지에서 확인하실 수 있습니다.',
            onBtnClick: () => {
              console.log('확인2')
            },
          })
        }}
      >
        Alert2오픈
      </Button>
    </>
  )
}

export default App
