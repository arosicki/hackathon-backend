@echo off
set /a port=(%RANDOM%*30000/32768)+1
set /a httpport=(%RANDOM%*8400/32768)+1
set enode=Podaj enode ze strony: 
set /p etha=Podaj swoj adres konta ethereum:  
set /p threads=Podaj ilosc watkow cpu do kopania:  
set /a netid=4591

if not exist "%cd%\main\eth\" geth --datadir="%cd%\main\eth" init "%cd%\genesis.json"

geth --datadir="%cd%\main\eth" --identity "Sproutify" --syncmode "full" --mine --miner.threads "%threads%" --miner.etherbase "%etha%" --ipcdisable --port "%port%" --networkid "%netid%" --bootnodes %enode% console

