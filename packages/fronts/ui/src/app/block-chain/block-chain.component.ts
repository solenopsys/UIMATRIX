import { Component, OnInit, ViewEncapsulation } from '@angular/core';




@Component({
  selector: 'exhibition-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlockChainComponent implements OnInit {
  ws:WebSocket
  constructor() {}

  ngOnInit(): void {
    this.ws = new WebSocket("ws://localhost:9944/");
    this.ws.onmessage = (event: { data: string }) => {
      console.log("DATA",event.data)
    };
    this.ws.onopen = () => {
      console.log("CONNECTED")
      this.ws.send('{"id":1,"jsonrpc":"2.0","method":"chain_getBlockHash","params":[176]}\t')
      this.ws.send('{"id":291,"jsonrpc":"2.0","method":"state_getRuntimeVersion","params":["0x5bb8d8adc22b0e34056579ed3ea805d8c0b416fc3e2e87dc0b411f1f1bafe369"]}\t')
    };
  }

}
