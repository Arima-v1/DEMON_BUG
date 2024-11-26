require('./database/config')
const {
    default: tdxConnect,
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
    getAggregateVotesInPollMessage,
    makeCacheableSignalKeyStore,
    Browsers,
    MessageRetryMap,
  } = require('@whiskeysockets/baileys'),
  pino = require('pino'),
  chalk = require('chalk'),
  { Boom } = require('@hapi/boom'),
  fs = require('fs'),
  { spawn: spawn, exec } = require('child_process'),
  fsPromises = fs.promises,
  axios = require('axios'),
  FileType = require('file-type'),
  path = require('path'),
  _ = require('lodash'),
  PhoneNumber = require('awesome-phonenumber'),
  { say } = require('cfonts'),
  moment = require('moment-timezone'),
  readline = require('readline'),
  yargs = require('yargs/yargs'),
  NodeCache = require('node-cache'),
  yangBacaHomo = [
    '\n\u2804\u2804\u2804\u28B0\u28E7\u28FC\u28EF\u2804\u28F8\u28E0\u28F6\u28F6\u28E6\u28FE\u2804\u2804\u2804\u2804\u2840\u2804\u2880\u28FF\u28FF\u2804\u2804\u2804\u28B8\u2847\u2804\u2804\n\u2804\u2804\u2804\u28FE\u28FF\u283F\u283F\u2836\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28E6\u28E4\u28C4\u2880\u2845\u28A0\u28FE\u28DB\u2849\u2804\u2804\u2804\u2838\u2880\u28FF\u2804\n\u2804\u2804\u2880\u284B\u28E1\u28F4\u28F6\u28F6\u2840\u2804\u2804\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F4\u28FF\u28FF\u28FF\u2883\u28E4\u28C4\u28C0\u28E5\u28FF\u28FF\u2804\n\u2804\u2804\u28B8\u28C7\u283B\u28FF\u28FF\u28FF\u28E7\u28C0\u2880\u28E0\u284C\u28BB\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u283F\u283F\u28FF\u28FF\u28FF\u2804\n\u2804\u2880\u28B8\u28FF\u28F7\u28E4\u28E4\u28E4\u28EC\u28D9\u28DB\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u28FF\u28FF\u284D\u2804\u2804\u2880\u28E4\u28C4\u2809\u280B\u28F0\n\u2804\u28FC\u28D6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u2887\u28FF\u28FF\u2877\u2836\u2836\u28BF\u28FF\u28FF\u2807\u2880\u28E4\n\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FD\u28FF\u28FF\u28FF\u2847\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28E5\u28F4\u28FF\u2857\n\u2880\u2808\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u285F\u2804\n\u28B8\u28FF\u28E6\u28CC\u28DB\u28FB\u28FF\u28FF\u28E7\u2819\u281B\u281B\u286D\u2805\u2812\u2826\u282D\u28ED\u287B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2803\u2804\n\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2846\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2839\u2808\u288B\u28FD\u28FF\u28FF\u28FF\u28FF\u28F5\u28FE\u2803\u2804\n\u2804\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2804\u28F4\u28FF\u28F6\u28C4\u2804\u28F4\u28F6\u2804\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2803\u2804\u2804\n\u2804\u2804\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2844\u28BB\u28FF\u28FF\u28FF\u2804\u28FF\u28FF\u2840\u28FE\u28FF\u28FF\u28FF\u28FF\u28DB\u281B\u2801\u2804\u2804\u2804\n\u2804\u2804\u2804\u2804\u2808\u281B\u28BF\u28FF\u28FF\u28FF\u2801\u281E\u28BF\u28FF\u28FF\u2844\u28BF\u28FF\u2847\u28F8\u28FF\u28FF\u283F\u281B\u2801\u2804\u2804\u2804\u2804\u2804\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2809\u283B\u28FF\u28FF\u28FE\u28E6\u2859\u283B\u28F7\u28FE\u28FF\u2803\u283F\u280B\u2801\u2804\u2804\u2804\u2804\u2804\u2880\u28E0\u28F4\n\u28FF\u28FF\u28FF\u28F6\u28F6\u28EE\u28E5\u28D2\u2832\u28AE\u28DD\u287F\u28FF\u28FF\u2846\u28FF\u287F\u2803\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28E0\u28F4\u28FF\u28FF\u28FF\n',
    '\n\u28FF\u28FF\u28F7\u2841\u2886\u2808\u2815\u2895\u2882\u2895\u2882\u2895\u2882\u2894\u2882\u2895\u2884\u2802\u28C2\u2802\u2806\u2882\u2895\u2882\u2895\u2882\u2895\u2882\u2895\u2882\n\u28FF\u28FF\u28FF\u2877\u280A\u2862\u2879\u28E6\u2851\u2882\u2895\u2882\u2895\u2882\u2895\u2882\u2815\u2814\u280C\u281D\u281B\u2836\u2836\u28B6\u28E6\u28C4\u2882\u2895\u2882\u2895\n\u28FF\u28FF\u280F\u28E0\u28FE\u28E6\u2850\u288C\u28BF\u28F7\u28E6\u28C5\u2851\u2815\u2821\u2810\u28BF\u283F\u28DB\u281F\u281B\u281B\u281B\u281B\u2821\u28B7\u2848\u2882\u2895\u2882\n\u281F\u28E1\u28FE\u28FF\u28FF\u28FF\u28FF\u28E6\u28D1\u281D\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u2875\u2881\u28E4\u28F6\u28F6\u28FF\u28BF\u28BF\u28BF\u285F\u28BB\u28E4\u2891\u2882\n\u28FE\u28FF\u28FF\u287F\u289F\u28DB\u28FB\u28FF\u28FF\u28FF\u28E6\u28EC\u28D9\u28FB\u28FF\u28FF\u28F7\u28FF\u28FF\u289F\u289D\u2895\u2895\u2895\u2895\u28BD\u28FF\u28FF\u28F7\u28D4\n\u28FF\u28FF\u2835\u281A\u2809\u2880\u28C0\u28C0\u28C8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28D7\u2895\u2895\u2895\u2895\u2895\u2895\u28FD\u28FF\u28FF\u28FF\u28FF\n\u28B7\u28C2\u28E0\u28F4\u28FE\u287F\u287F\u287B\u287B\u28FF\u28FF\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F5\u28F5\u28F5\u28F7\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\n\u288C\u283B\u28FF\u287F\u286B\u286A\u286A\u286A\u286A\u28FA\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2803\n\u2823\u2841\u2839\u286A\u286A\u286A\u286A\u28EA\u28FE\u28FF\u28FF\u28FF\u28FF\u280B\u2810\u2889\u288D\u2884\u288C\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2808\n\u2863\u2858\u2884\u2819\u28FE\u28FE\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\u2890\u2895\u2895\u2895\u2895\u2895\u2858\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2820\u2808\n\u280C\u288A\u2882\u28A3\u2839\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2890\u2895\u2895\u2895\u2895\u2895\u2885\u28FF\u28FF\u28FF\u28FF\u287F\u288B\u289C\u2820\u2808\n\u2804\u2801\u2815\u289D\u2862\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28D5\u28D1\u28D1\u28D1\u28F5\u28FF\u28FF\u28FF\u287F\u288B\u2894\u2895\u28FF\u2820\u2808\n\u2828\u2842\u2840\u2891\u2895\u2845\u2802\u2804\u2809\u281B\u283B\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u288B\u2894\u2895\u2895\u28FF\u28FF\u2820\u2808\n\u2804\u282A\u28C2\u2801\u2895\u2806\u2804\u2802\u2804\u2801\u2840\u2802\u2840\u2804\u2888\u2809\u288D\u289B\u289B\u289B\u288B\u2894\u2895\u2895\u2895\u28FD\u28FF\u28FF\u2820\u2808\n',
    '\n\u28FF\u2847\u2818\u2847\u2880\u28F6\u28F6\u2804\u2808\u28FE\u285F\u2882\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2889\u28BE\u2883\u28FF\u28FF\u285F\u28F8\u28B8\u28FF\u28FF\u28F8\n\u28FF\u28B8\u28E6\u28A7\u28B8\u28FF\u28FF\u28B1\u2804\u2804\u28C7\u28FC\u28FF\u28FF\u28FF\u28FF\u28FF\u289F\u28FC\u28FF\u286F\u2838\u28FF\u28B3\u28B1\u284F\u28FC\u28FF\u2887\u28FF\n\u284F\u28FE\u28BD\u28FC\u28B8\u28FF\u28FF\u2858\u28C6\u2880\u281B\u28FF\u28FF\u28FF\u28FF\u287F\u28EB\u28FE\u28FF\u28FF\u2887\u28FF\u2802\u288C\u287E\u2847\u28FF\u287F\u28B8\u28FF\n\u28A7\u28FF\u2804\u28B9\u28B8\u28FF\u28FF\u28F7\u28ED\u28B8\u2844\u28FF\u28FF\u28FF\u288B\u28F5\u28FF\u28FF\u287F\u281F\u2868\u2861\u2804\u28FE\u28FF\u2846\u28ED\u2847\u28FF\u28FF\n\u28FC\u284F\u2840\u2804\u2880\u28BF\u28FF\u28FF\u285F\u28FE\u2847\u28FF\u287F\u28E1\u2881\u28FF\u28FF\u28EB\u2876\u2883\u2875\u28E1\u28FF\u28EE\u287B\u2847\u28FF\u28B8\u28EE\u28BF\n\u28FF\u2847\u28E7\u28A0\u2838\u284E\u284D\u286D\u28BE\u284F\u28E7\u288B\u28BE\u280F\u28FC\u28FF\u28FF\u283F\u28F5\u28FE\u28D5\u283F\u28FF\u28FF\u28F7\u28A1\u280F\u28FE\u28FF\u28FF\n\u28FF\u2801\u28FF\u2808\u2804\u2804\u2883\u28B9\u2840\u2838\u28B8\u28BF\u2838\u28B0\u28BB\u28BF\u28DF\u2881\u28C0\u2804\u2804\u2809\u2812\u289D\u28BF\u2838\u28F4\u28FF\u28FF\u28FF\n\u284D\u2807\u28FF\u28F7\u28B0\u28B0\u28B8\u2804\u2843\u2846\u2808\u2808\u2840\u284C\u2820\u2838\u2803\u28FF\u28CF\u2873\u28B7\u2884\u2840\u2804\u2804\u2830\u28FF\u28FF\u28FF\u28FF\n\u2847\u2804\u2838\u28FF\u28B8\u28FF\u28F6\u2844\u28C7\u2803\u2847\u2844\u2847\u2801\u2803\u2804\u2808\u288A\u283B\u283F\u28FF\u28FF\u28FF\u28E6\u2804\u2818\u28FF\u28FF\u28FF\u28FF\n\u2847\u2804\u2804\u28BB\u28F8\u28FF\u28FF\u280F\u2859\u28B8\u28C7\u28E1\u28B0\u2880\u2804\u2804\u2804\u2808\u2841\u28B1\u2888\u28BF\u28FF\u287F\u2844\u28F0\u28F6\u28FF\u28FF\u28FF\n\u2847\u2804\u2804\u2804\u28BB\u28FF\u287F\u28B0\u2847\u2806\u2832\u2836\u28DD\u283E\u2838\u28B4\u28A0\u2804\u2807\u28B8\u28B8\u2804\u2876\u285C\u28FD\u28FF\u28FF\u28FF\u28FF\u288F\n\u2801\u2804\u2804\u2804\u2804\u28BF\u2847\u2827\u28A3\u28F8\u28E6\u28C4\u28C0\u2801\u2813\u28B8\u28C4\u2838\u2880\u2804\u2840\u2840\u286A\u28FD\u28FF\u28FF\u28BF\u28FF\u289F\u28EC\n\u2804\u2804\u2804\u2804\u2804\u2808\u28A7\u282F\u28B8\u28FF\u28FF\u28FF\u287F\u2830\u28F7\u2804\u28FF\u28C7\u287F\u2804\u2840\u2826\u28F0\u28FF\u287F\u28F1\u28FF\u284F\u28BE\u28EB\n\u2804\u2804\u2804\u2804\u2804\u2804\u2808\u28CC\u288C\u28BF\u28FF\u28FF\u2807\u283C\u2883\u28A0\u2887\u28FB\u28E7\u28FF\u2861\u28F8\u28FF\u283F\u2881\u285F\u2881\u28F3\u28FF\u28FF\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2833\u289D\u28D2\u28D2\u2830\u28D8\u28F4\u2867\u283F\u28FF\u28DB\u286F\u28F1\u287F\u28EB\u288E\u28EA\u28CE\u28FF\u28E7\u28BB\u283F\n',
    '\n\u28FF\u28EF\u28FF\u28DF\u28DF\u287C\u28FF\u287C\u287F\u28F7\u28FF\u28FF\u28FF\u283D\u285F\u288B\u28FF\u28FF\u2818\u28FC\u28F7\u285F\u283B\u287F\u28F7\u287C\u28DD\u287F\u287E\u28FF\n\u28FF\u28FF\u28FF\u28FF\u2881\u28F5\u2847\u285F\u2800\u28FF\u28FF\u28FF\u2807\u2800\u2847\u28F4\u28FF\u28FF\u28E7\u28FF\u28FF\u2847\u2800\u28A3\u28FF\u28F7\u28C0\u284F\u28BB\u28FF\n\u28FF\u28FF\u283F\u28FF\u28FF\u28FF\u2837\u2801\u2800\u281B\u281B\u280B\u2800\u2802\u2839\u283F\u283F\u283F\u283F\u283F\u2809\u2801\u2800\u2818\u281B\u281B\u281B\u2803\u28B8\u28EF\n\u28FF\u2847\u2800\u28C4\u28C0\u28C0\u28C8\u28C1\u2808\u2809\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2820\u280E\u2808\u2800\u28C0\u28C1\u28C0\u28C0\u2860\u2808\u2809\n\u28FF\u28EF\u28FD\u287F\u289F\u287F\u283F\u281B\u281B\u283F\u28F6\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u28A0\u28F4\u28FE\u281B\u281B\u283F\u283B\u281B\u283F\u28F7\u28F6\n\u28FF\u28FF\u28FF\u2800\u2800\u2800\u28FF\u287F\u28F6\u28FF\u28EB\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2830\u28FF\u283F\u283E\u28FF\u2847\u2800\u2800\u28BA\u28FF\n\u28FF\u28FF\u283B\u2840\u2800\u2800\u2819\u280F\u2812\u287B\u2803\u2800\u2800\u2800\u2800\u28C0\u2800\u2800\u2800\u2800\u2800\u2810\u2853\u289A\u281F\u2801\u2800\u2800\u287E\u28AB\n\u28FF\u28FF\u2800\u2800\u2840\u2800\u2800\u2848\u28C9\u2840\u2860\u28D0\u28C5\u28FD\u28FA\u28FF\u28EF\u2861\u28F4\u28F4\u28D4\u28E0\u28C0\u28C0\u2840\u2880\u2840\u2840\u2800\u28F8\n\u28FF\u28FF\u28F7\u28FF\u28DF\u28FF\u287F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28BB\u28BE\u28F7\u28FF\n\u28FF\u28FF\u28DF\u282B\u287E\u281F\u282B\u28BE\u282F\u287B\u289F\u287D\u28B6\u28BF\u28FF\u28FF\u285B\u2815\u280E\u283B\u281D\u282A\u2896\u281D\u281F\u28AB\u283E\u281C\u28BF\u28FF\n\u28FF\u28FF\u28FF\u2809\u2800\u2800\u2800\u2800\u2808\u2800\u2800\u2800\u2800\u28F0\u28CB\u28C0\u28C8\u28E2\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28D0\u28B8\u28FF\n\u28FF\u28FF\u28FF\u28C6\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\n\u28FF\u28FF\u28FF\u28FF\u28E6\u2854\u2800\u2800\u2800\u2800\u2800\u2800\u28BB\u28FF\u287F\u28FF\u28FF\u28BD\u28FF\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28FE\u28FF\u28FF\n\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2800\u2800\u2800\u2818\u281B\u2885\u28D9\u28D9\u283F\u2809\u2800\u2800\u2800\u2880\u28E0\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\n\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C4\u28C5\u2800\u2813\u2800\u2800\u28C0\u28E0\u28F4\u28FA\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\n',
    '\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28C0\u28E0\u28E4\u28F6\u28F6\u28F6\u28E4\u28C4\u28C0\u28C0\u2804\u2804\u2804\u2804\u2804\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28C0\u28E4\u28E4\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28DF\u28BF\u28FF\u28FF\u28FF\u28F6\u28E4\u2840\u2804\n\u2804\u2804\u2804\u2804\u2804\u2804\u2880\u28FC\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28DC\u283F\u283F\u28FF\u28FF\u28E7\u2893\n\u2804\u2804\u2804\u2804\u2804\u2860\u289B\u28FF\u28FF\u28FF\u285F\u28FF\u28FF\u28FD\u28CB\u283B\u28BB\u28FF\u28FF\u28FF\u28FF\u287B\u28E7\u2860\u28ED\u28ED\u28FF\u2867\n\u2804\u2804\u2804\u2804\u2804\u28A0\u28FF\u285F\u28FF\u28BB\u2803\u28FB\u28E8\u28FB\u283F\u2840\u28DD\u287F\u28FF\u28FF\u28F7\u28DC\u28DC\u28BF\u28DD\u287F\u287B\u2894\n\u2804\u2804\u2804\u2804\u2804\u28B8\u285F\u28F7\u28BF\u2888\u28DA\u28D3\u2861\u28FB\u28FF\u28F6\u28EC\u28DB\u28D3\u28C9\u287B\u28BF\u28CE\u2822\u283B\u28F4\u287E\u282B\n\u2804\u2804\u2804\u2804\u2804\u28B8\u2803\u28B9\u287C\u28B8\u28FF\u28FF\u28FF\u28E6\u28F9\u28FF\u28FF\u28FF\u283F\u283F\u283F\u2837\u28CE\u287C\u2806\u28FF\u2835\u28EB\n\u2804\u2804\u2804\u2804\u2804\u2808\u2804\u2838\u285F\u285C\u28E9\u2844\u2804\u28FF\u28FF\u28FF\u28FF\u28F6\u2880\u2880\u28FF\u28F7\u28FF\u28FF\u2850\u2847\u2844\u28FF\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2801\u28B6\u28BB\u28E7\u28D6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u28FF\u28C7\u285F\u28C7\u28F7\u28FF\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28B8\u28C6\u28E4\u28FD\u28FF\u287F\u283F\u283F\u28FF\u28FF\u28E6\u28F4\u2847\u28FF\u28A8\u28FE\u28FF\u28B9\u28B8\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28B8\u28FF\u280A\u285B\u28BF\u28FF\u28FF\u28FF\u28FF\u287F\u28EB\u28B1\u28BA\u2847\u284F\u28FF\u28FF\u28F8\u287C\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28B8\u287F\u2804\u28FF\u28F7\u28FE\u284D\u28ED\u28F6\u28FF\u28FF\u284C\u28FC\u28F9\u28B1\u2839\u28FF\u28C7\u28E7\n\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u2804\u28FC\u2801\u28E4\u28ED\u28ED\u284C\u2881\u28FC\u28FF\u28FF\u28FF\u28B9\u2847\u28ED\u28E4\u28F6\u28E4\u285D\u287C\n\u2804\u28C0\u2824\u2840\u2804\u2804\u2804\u2804\u2804\u284F\u28C8\u287B\u287F\u2803\u2880\u28FE\u28FF\u28FF\u28FF\u287F\u287C\u2801\u28FF\u28FF\u28FF\u287F\u28B7\u28B8\n\u28B0\u28F7\u2867\u2862\u2804\u2804\u2804\u2804\u2820\u28A0\u285B\u283F\u2804\u2820\u282C\u283F\u28FF\u282D\u282D\u28B1\u28C7\u28C0\u28ED\u2845\u2836\u28FE\u28F7\u28F6\n\u2808\u28BF\u28FF\u28E7\u2804\u2804\u2804\u2804\u2880\u285B\u283F\u2804\u2804\u2804\u2804\u28A0\u2803\u2804\u2804\u285C\u2804\u2804\u28E4\u2880\u28F6\u28EE\u284D\u28F4\n\u2804\u2808\u28FF\u28FF\u2840\u2804\u2804\u2804\u28A9\u28DD\u2803\u2804\u2804\u2880\u2844\u284E\u2804\u2804\u2804\u2807\u2804\u2804\u2805\u28F4\u28F6\u28F6\u2804\u28F6\n',
    '\n\u284F\u2809\u2809\u2809\u2809\u2809\u2809\u280B\u2809\u2809\u2809\u2809\u2809\u2809\u280B\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2819\u2809\u2809\u2809\u2839\n\u2847\u28B8\u28FF\u285F\u281B\u28BF\u28F7\u2800\u28B8\u28FF\u285F\u281B\u28BF\u28F7\u2844\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u2800\n\u2847\u28B8\u28FF\u28E7\u28E4\u28FE\u283F\u2800\u28B8\u28FF\u28C7\u28C0\u28F8\u287F\u2803\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u28B8\u28FF\u28C7\u28C0\u28F8\u28FF\u2847\u2800\n\u2847\u28B8\u28FF\u284F\u2809\u28B9\u28FF\u2846\u28B8\u28FF\u285F\u281B\u28BB\u28F7\u2844\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u28B8\u28FF\u284F\u2809\u28B9\u28FF\u2847\u2800\n\u2847\u28B8\u28FF\u28E7\u28E4\u28FC\u287F\u2803\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u2838\u28FF\u28E7\u28E4\u28FC\u287F\u2801\u28B8\u28FF\u2847\u2800\u28B8\u28FF\u2847\u2800\n\u28C7\u28C0\u28C0\u28C0\u28C0\u28C0\u28C0\u28C4\u28C0\u28C0\u28C0\u28C0\u28C0\u28C0\u28C0\u28E0\u28C0\u2848\u2809\u28C1\u28C0\u28C4\u28C0\u28C0\u28C0\u28E0\u28C0\u28C0\u28C0\u28F0\n\u28C7\u28FF\u2818\u28FF\u28FF\u28FF\u287F\u287F\u28DF\u28DF\u289F\u289F\u289D\u2835\u285D\u28FF\u287F\u2882\u28FC\u28FF\u28F7\u28CC\u2829\u286B\u287B\u28DD\u2839\u28BF\u28FF\u28F7\n\u2846\u28FF\u28C6\u2831\u28DD\u2875\u28DD\u2885\u2819\u28FF\u2895\u2895\u2895\u2895\u289D\u28E5\u2892\u2805\u28FF\u28FF\u28FF\u287F\u28F3\u28CC\u282A\u286A\u28E1\u2891\u289D\u28C7\n\u2846\u28FF\u28FF\u28E6\u2839\u28F3\u28F3\u28D5\u2885\u2808\u2897\u2895\u2895\u2895\u2895\u2895\u2888\u2886\u281F\u280B\u2809\u2801\u2809\u2809\u2801\u2808\u283C\u2890\u2895\u28BD\n\u2857\u28B0\u28F6\u28F6\u28E6\u28DD\u289D\u2895\u2895\u2805\u2846\u2895\u2895\u2895\u2895\u2895\u28F4\u280F\u28E0\u2876\u281B\u2849\u2849\u285B\u28B6\u28E6\u2840\u2810\u28D5\u2895\n\u285D\u2844\u28BB\u289F\u28FF\u28FF\u28F7\u28D5\u28D5\u28C5\u28FF\u28D4\u28D5\u28F5\u28F5\u28FF\u28FF\u28A0\u28FF\u28A0\u28EE\u2848\u28CC\u2828\u2805\u2839\u28F7\u2840\u28B1\u2895\n\u285D\u2875\u281F\u2808\u2880\u28C0\u28C0\u2840\u2809\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FC\u28FF\u2888\u284B\u2834\u28BF\u285F\u28E1\u2847\u28FF\u2847\u2840\u2895\n\u285D\u2801\u28E0\u28FE\u281F\u2849\u2849\u2849\u283B\u28E6\u28FB\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2838\u28FF\u28E6\u28E5\u28FF\u2847\u287F\u28F0\u2897\u2884\n\u2801\u28B0\u28FF\u284F\u28F4\u28CC\u2808\u28CC\u2821\u2808\u28BB\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28EC\u28C9\u28C9\u28C1\u28C4\u2896\u2895\u2895\u2895\n\u2840\u28BB\u28FF\u2847\u2899\u2801\u2834\u28BF\u285F\u28E1\u2846\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F5\u28F5\u28FF\n\u287B\u28C4\u28FB\u28FF\u28CC\u2818\u28BF\u28F7\u28E5\u28FF\u2807\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281B\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\n\u28F7\u2884\u283B\u28FF\u28DF\u283F\u2826\u280D\u2809\u28E1\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28B8\u28FF\u28E6\u2819\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\n\u2855\u2851\u28D1\u28C8\u28FB\u2897\u289F\u289E\u289D\u28FB\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2838\u28FF\u283F\u2803\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2801\u28E0\n\u285D\u2875\u2848\u289F\u2895\u2895\u2895\u2895\u28F5\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u280B\u28C0\u28C8\u2819\n\u285D\u2875\u2855\u2840\u2811\u2833\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u281B\u2889\u2860\u2872\u286B\u286A\u286A\u2863\n',
    '\n\u2804\u28FE\u28FF\u2847\u28B8\u28FF\u28FF\u28FF\u2804\u2808\u28FF\u28FF\u28FF\u28FF\u2808\u28FF\u2847\u28B9\u28FF\u28FF\u28FF\u2847\u2847\u28B8\u28FF\u28FF\u2847\u28FF\u28FF\u28FF\n\u28A0\u28FF\u28FF\u2847\u28B8\u28FF\u28FF\u28FF\u2847\u2804\u28B9\u28FF\u28FF\u28FF\u2840\u28FF\u28E7\u28B8\u28FF\u28FF\u28FF\u2801\u2847\u28B8\u28FF\u28FF\u2801\u28FF\u28FF\u28FF\n\u28B8\u28FF\u28FF\u2847\u2838\u28FF\u28FF\u28FF\u28FF\u2844\u2808\u28BF\u28FF\u28FF\u2847\u28B8\u28FF\u2840\u28FF\u28FF\u287F\u2838\u2847\u28F8\u28FF\u28FF\u2804\u28FF\u28FF\u28FF\n\u28B8\u28FF\u287F\u2837\u2804\u283F\u283F\u283F\u281F\u2813\u2830\u2818\u283F\u28FF\u28FF\u2848\u28FF\u2847\u28B9\u285F\u2830\u2826\u2801\u2808\u2809\u280B\u2804\u283B\u28BF\u28FF\n\u28A8\u2851\u2836\u284F\u281B\u2810\u280B\u2813\u2832\u2836\u28ED\u28E4\u28F4\u28E6\u28ED\u28E5\u28EE\u28FE\u28EC\u28F4\u286E\u281D\u2812\u2802\u2802\u2818\u2809\u283F\u2816\u28EC\n\u2808\u2809\u2804\u2840\u2804\u28C0\u28C0\u28C0\u28C0\u2808\u289B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28DF\u2801\u28C0\u28E4\u28E4\u28E0\u2840\u2804\u2840\u2808\u2801\n\u2804\u2820\u28FE\u2840\u28FE\u28FF\u28E7\u28FC\u28FF\u287F\u28A0\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28FC\u28FF\u28E7\u28FC\u28FF\u28FF\u2880\u28FF\u2847\u2804\n\u2840\u2804\u283B\u28F7\u2858\u28BF\u28FF\u28FF\u287F\u28A3\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28DC\u28BF\u28FF\u28FF\u287F\u2883\u28FE\u281F\u2881\u2808\n\u2883\u28BB\u28F6\u28EC\u28FF\u28F6\u28EC\u28E5\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28F6\u28FE\u28FF\u28F7\u28FE\u28FE\u28A3\n\u2844\u2808\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28FC\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2818\n\u28FF\u2850\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u28A0\u2883\n\u28FF\u28F7\u2840\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u283F\u283F\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u280B\u2880\u2806\u28FC\n\u28FF\u28FF\u28F7\u2840\u2804\u2808\u281B\u28BF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28F6\u28F6\u28F6\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u280B\u2820\u2802\u2880\u28FE\u28FF\n\u28FF\u28FF\u28FF\u28E7\u2804\u2804\u28B5\u28A0\u28C8\u281B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u288B\u2841\u28B0\u280F\u2804\u2804\u28FC\u28FF\u28FF\n\u28BB\u28FF\u28FF\u28FF\u2844\u28A2\u2828\u2804\u28EF\u2804\u2804\u28CC\u28C9\u281B\u283B\u281F\u281B\u288B\u28C9\u28E4\u2804\u28B8\u2847\u28E8\u28E4\u2804\u28B8\u28FF\u28FF\u28FF\n',
  ],
  imageAscii = yangBacaHomo[Math.floor(Math.random() * yangBacaHomo.length)]
let low
try {
  low = require('lowdb')
} catch (_0x18f143) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low,
  mongoDB = require('./lib/mongoDB'),
  {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
  } = require('./lib/exif'),
  {
    smsg,
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    fetchJson,
    sleep,
  } = require('./lib/myfunction'),
  { color } = require('./lib/color'),
  usePairingCode = global.connect,
  listcolor = ['cyan', 'magenta', 'green', 'yellow', 'blue'],
  randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)],
  question = (_0x5a49a8) => {
    const _0x179cdf = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((_0x4d7b28) => {
      _0x179cdf.question(color(_0x5a49a8, randomcolor), (_0x1b4dca) => {
        _0x4d7b28(_0x1b4dca)
        _0x179cdf.close()
      })
    })
  }
async function tdxStart() {
  const _0xfcbc23 = makeInMemoryStore({
      logger: pino().child({
        level: 'silent',
        stream: 'store',
      }),
    }),
    { state: _0xcb3fa7, saveCreds: _0x382b0a } = await useMultiFileAuthState(
      './' + global.sessionName
    ),
    { version: _0x456de2, isLatest: _0x3531fc } =
      await fetchLatestBaileysVersion(),
    _0x19a632 = new NodeCache(),
    _0x3ee304 = tdxConnect({
      isLatest: _0x3531fc,
      version: _0x456de2,
      keepAliveIntervalMs: 30000,
      printQRInTerminal: !usePairingCode,
      logger: pino({ level: 'fatal' }),
      auth: {
        creds: _0xcb3fa7.creds,
        keys: makeCacheableSignalKeyStore(
          _0xcb3fa7.keys,
          pino({ level: 'fatal' }).child({ level: 'fatal' })
        ),
      },
      transactionOpts: {
        maxCommitRetries: 10,
        delayBetweenTriesMs: 10,
      },
      browser: Browsers.ubuntu('Chrome'),
      generateHighQualityLinkPreview: true,
      syncFullHistory: true,
      maxMsgRetryCount: 15,
      retryRequestDelayMs: 10,
      connectTimeoutMs: 0,
      defaultQueryTimeoutMs: undefined,
      MessageRetryMap: MessageRetryMap,
      resolveMsgBuffer: _0x19a632,
      patchMessageBeforeSending: async (_0x3c025c) => {
        const _0x420d9c = !!(
          _0x3c025c.buttonsMessage ||
          _0x3c025c.listMessage ||
          _0x3c025c.templateMessage
        )
        return (
          _0x420d9c &&
            (_0x3c025c = {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadataVersion: 2,
                    deviceListMetadata: {},
                  },
                  ..._0x3c025c,
                },
              },
            }),
          _0x3c025c
        )
      },
      getMessage: async (_0x3ab10d) => {
        if (_0xfcbc23) {
          const _0x3da4ad = await _0xfcbc23.loadMessage(
            _0x3ab10d.remoteJid,
            _0x3ab10d.id,
            undefined
          )
          return _0x3da4ad?.message
        }
        return { conversation: "hi, i'm spider8" }
      },
    })
  if (usePairingCode && !_0x3ee304.authState.creds.registered) {
    say('Cracked By Rage\n', {
      font: 'block',
      align: 'center',
      gradient: [randomcolor, randomcolor],
    })
    say(
      'Create By \uD835\uDC13͜͡\uD835\uDC1D͜\uD835\uDC17͡ \uD835\uDC13͜͡\uD835\uDC1D͜\uD835\uDC17͡\n',
      {
        font: 'console',
        align: 'center',
        gradient: [randomcolor, randomcolor],
      }
    )
    let _0x15db5f = await question(
        '<!> TYPE YOUR PHONE NUMBER WITHOUT (+). \u274C\n<\u2713> EXAMPLE : 2347054795849\n\n <+> NUMBER: '
      ),
      _0xf333de = _0x15db5f.replace(/[^0-9]/g, '')
    await console.clear()
    let _0x479f6d = await _0x3ee304.requestPairingCode(_0xf333de.trim())
    console.log(
      color(
        imageAscii +
          '\n\n[ # ] enter that code into WhatsApp, motherfucker : ' +
          _0x479f6d,
        randomcolor
      )
    )
  }
  _0xfcbc23?.bind(_0x3ee304.ev)
  global.opts = new Object(
    yargs(process.argv.slice(2)).exitProcess(false).parse()
  )
  global.db = new Low(
    /https?:\/\//.test(opts.db || '')
      ? new cloudDBAdapter(opts.db)
      : /mongodb/.test(opts.db)
      ? new mongoDB(opts.db)
      : new JSONFile('./database/database.json')
  )
  global.DATABASE = global.db
  global.loadDatabase = async function _0x320acd() {
    if (global.db.READ) {
      return new Promise((_0xd0b924) =>
        setInterval(function () {
          !global.db.READ &&
            (clearInterval(this),
            _0xd0b924(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
        }, 1000)
      )
    }
    if (global.db.data !== null) {
      return
    }
    global.db.READ = true
    await global.db.read()
    global.db.READ = false
    global.db.data = {
      users: {},
      chats: {},
      game: {},
      database: {},
      settings: {},
      setting: {},
      others: {},
      sticker: {},
      ...(global.db.data || {}),
    }
    global.db.chain = _.chain(global.db.data)
  }
  loadDatabase()
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) {
        await global.db.write()
      }
    }, 30000)
  }
  return (
    (_0x3ee304.public = false),
    _0x3ee304.ev.on('connection.update', async (_0x20168c) => {
      const { connection: _0x223067, lastDisconnect: _0x33a3ed } = _0x20168c
      try {
        if (_0x223067 === 'close') {
          let _0x57ef31 = new Boom(_0x33a3ed?.error)?.output.statusCode
          if (_0x57ef31 === DisconnectReason.badSession) {
            console.log(
              'Bad Session File, Please Delete Session and Scan Again'
            )
            process.exit()
          } else {
            if (_0x57ef31 === DisconnectReason.connectionClosed) {
              console.log('Connection closed, reconnecting....')
              tdxStart()
            } else {
              if (_0x57ef31 === DisconnectReason.connectionLost) {
                console.log('Connection Lost from Server, reconnecting...')
                tdxStart()
              } else {
                if (_0x57ef31 === DisconnectReason.connectionReplaced) {
                  console.log(
                    'Connection Replaced, Another New Session Opened, Please Close Current Session First'
                  )
                  exec('node ' + process.argv[1])
                } else {
                  if (_0x57ef31 === DisconnectReason.loggedOut) {
                    console.log('Device Logged Out, Please Scan Again And Run.')
                    process.exit()
                    tdxStart()
                  } else {
                    if (_0x57ef31 === DisconnectReason.restartRequired) {
                      console.log('Restart Required, Restarting...')
                      tdxStart()
                    } else {
                      _0x57ef31 === DisconnectReason.timedOut
                        ? (console.log('Connection TimedOut, Reconnecting...'),
                          tdxStart())
                        : _0x3ee304.end(
                            'Unknown DisconnectReason: ' +
                              _0x57ef31 +
                              '|' +
                              _0x223067
                          )
                    }
                  }
                }
              }
            }
          }
        }
        if (
          _0x20168c.connection === 'connecting' ||
          _0x20168c.receivedPendingNotifications === 'false'
        ) {
        }
        if (
          _0x20168c.connection === 'open' ||
          _0x20168c.receivedPendingNotifications === 'true'
        ) {
          return (
            await console.clear(),
            await console.log(
              color(
                imageAscii +
                  '\n\n<\u2105> \uD835\uDC13͜͡\uD835\uDC1D͜\uD835\uDC17͡ V IS CONNECTED!!!',
                '' + randomcolor
              )
            ),
            await console.log(
              color('\nCreated By King Sam\n', '' + randomcolor)
            ),
            new Promise((_0x561430, _0x1c4c3e) => {
              setTimeout(async () => {
                try {
                  await _0x3ee304.end({ reason: 'Clearing store' })
                } catch (_0x2f8c23) {
                  console.log(_0x2f8c23)
                }
              }, 1800000)
            })
          )
        }
      } catch (_0x20f13b) {
        console.log('Error In Connection.update ' + _0x20f13b)
        tdxStart()
      }
    }),
    _0x3ee304.ev.on('messages.update', async (_0x220565) => {
      for (const { key: _0x3bd63c, update: _0x104392 } of _0x220565) {
        if (_0x104392.pollUpdates && _0x3bd63c.fromMe) {
          const _0x3d5bff = await getMessage(_0x3bd63c)
          if (_0x3d5bff) {
            const _0x40d23b = await getAggregateVotesInPollMessage({
              message: _0x3d5bff,
              pollUpdates: _0x104392.pollUpdates,
            })
            var _0x586648 = _0x40d23b.filter(
              (_0x47210b) => _0x47210b.voters.length !== 0
            )[0]?.name
            if (_0x586648 == undefined) {
              return
            }
            var _0x48d44e = prefix + _0x586648
            _0x3ee304.appendTextMessage(_0x48d44e, _0x220565)
          }
        }
      }
    }),
    (_0x3ee304.decodeJid = (_0x5ab4ce) => {
      if (!_0x5ab4ce) {
        return _0x5ab4ce
      }
      if (/:\d+@/gi.test(_0x5ab4ce)) {
        let _0x5f6dec = jidDecode(_0x5ab4ce) || {}
        return (
          (_0x5f6dec.user &&
            _0x5f6dec.server &&
            _0x5f6dec.user + '@' + _0x5f6dec.server) ||
          _0x5ab4ce
        )
      } else {
        return _0x5ab4ce
      }
    }),
    _0x3ee304.ev.on('contacts.update', (_0x13fbd0) => {
      for (let _0x29c0db of _0x13fbd0) {
        let _0x12a39e = _0x3ee304.decodeJid(_0x29c0db.id)
        if (_0xfcbc23 && _0xfcbc23.contacts) {
          _0xfcbc23.contacts[_0x12a39e] = {
            id: _0x12a39e,
            name: _0x29c0db.notify,
          }
        }
      }
    }),
    (_0x3ee304.setStatus = (_0x3a594b) => {
      return (
        _0x3ee304.query({
          tag: 'iq',
          attrs: {
            to: '@s.whatsapp.net',
            type: 'set',
            xmlns: 'status',
          },
          content: [
            {
              tag: 'status',
              attrs: {},
              content: Buffer.from(_0x3a594b, 'utf-8'),
            },
          ],
        }),
        _0x3a594b
      )
    }),
    (_0x3ee304.getName = (_0x4fb456, _0x293dff = false) => {
      let _0x5e7d45 = _0x3ee304.decodeJid(_0x4fb456)
      _0x293dff = _0x3ee304.withoutContact || _0x293dff
      let _0x3009c6
      return _0x5e7d45.endsWith('@g.us')
        ? new Promise(async (_0x672206) => {
            _0x3009c6 = _0xfcbc23.contacts[_0x5e7d45] || {}
            if (!(_0x3009c6.name || _0x3009c6.subject)) {
              _0x3009c6 = (await _0x3ee304.groupMetadata(_0x5e7d45)) || {}
            }
            _0x672206(
              _0x3009c6.name ||
                _0x3009c6.subject ||
                PhoneNumber(
                  '+' + _0x5e7d45.replace('@s.whatsapp.net', '')
                ).getNumber('international')
            )
          })
        : ((_0x3009c6 =
            _0x5e7d45 === '0@s.whatsapp.net'
              ? {
                  id: _0x5e7d45,
                  name: 'WhatsApp',
                }
              : _0x5e7d45 === _0x3ee304.decodeJid(_0x3ee304.user.id)
              ? _0x3ee304.user
              : _0xfcbc23.contacts[_0x5e7d45] || {}),
          (_0x293dff ? '' : _0x3009c6.name) ||
            _0x3009c6.subject ||
            _0x3009c6.verifiedName ||
            PhoneNumber(
              '+' + _0x4fb456.replace('@s.whatsapp.net', '')
            ).getNumber('international'))
    }),
    (_0x3ee304.sendContact = async (
      _0x535426,
      _0x21a22f,
      _0x22f814 = '',
      _0x2b7d65 = {}
    ) => {
      let _0x92625a = []
      for (let _0x538f5c of _0x21a22f) {
        _0x92625a.push({
          displayName: await _0x3ee304.getName(_0x538f5c),
          vcard:
            'BEGIN:VCARD\nVERSION:3.0\nN:' +
            (await _0x3ee304.getName(_0x538f5c)) +
            '\nFN:' +
            (await _0x3ee304.getName(_0x538f5c)) +
            '\nitem1.TEL;waid=' +
            _0x538f5c.split('@')[0] +
            ':' +
            _0x538f5c.split('@')[0] +
            '\nitem1.X-ABLabel:Ponsel\nEND:VCARD',
        })
      }
      _0x3ee304.sendMessage(
        _0x535426,
        {
          contacts: {
            displayName: _0x92625a.length + ' Kontak',
            contacts: _0x92625a,
          },
          ..._0x2b7d65,
        },
        { quoted: _0x22f814 }
      )
    }),
    (_0x3ee304.serializeM = (_0x323ef8) =>
      smsg(_0x3ee304, _0x323ef8, _0xfcbc23)),
    (_0x3ee304.sendFileUrl = async (
      _0x3a3a26,
      _0xd4421,
      _0xb783b,
      _0x4fd81f,
      _0x46597d = {}
    ) => {
      let _0x36a11c = '',
        _0x2a49f3 = await axios.head(_0xd4421)
      _0x36a11c = _0x2a49f3.headers['content-type']
      if (_0x36a11c.split('/')[1] === 'gif') {
        return _0x3ee304.sendMessage(
          _0x3a3a26,
          {
            video: await getBuffer(_0xd4421),
            caption: _0xb783b,
            gifPlayback: true,
            ..._0x46597d,
          },
          {
            quoted: _0x4fd81f,
            ..._0x46597d,
          }
        )
      }
      let _0x44211e = _0x36a11c.split('/')[0] + 'Message'
      if (_0x36a11c === 'application/pdf') {
        return _0x3ee304.sendMessage(
          _0x3a3a26,
          {
            document: await getBuffer(_0xd4421),
            mimetype: 'application/pdf',
            caption: _0xb783b,
            ..._0x46597d,
          },
          {
            quoted: _0x4fd81f,
            ..._0x46597d,
          }
        )
      }
      if (_0x36a11c.split('/')[0] === 'image') {
        return _0x3ee304.sendMessage(
          _0x3a3a26,
          {
            image: await getBuffer(_0xd4421),
            caption: _0xb783b,
            ..._0x46597d,
          },
          {
            quoted: _0x4fd81f,
            ..._0x46597d,
          }
        )
      }
      if (_0x36a11c.split('/')[0] === 'video') {
        return _0x3ee304.sendMessage(
          _0x3a3a26,
          {
            video: await getBuffer(_0xd4421),
            caption: _0xb783b,
            mimetype: 'video/mp4',
            ..._0x46597d,
          },
          {
            quoted: _0x4fd81f,
            ..._0x46597d,
          }
        )
      }
      if (_0x36a11c.split('/')[0] === 'audio') {
        return _0x3ee304.sendMessage(
          _0x3a3a26,
          {
            audio: await getBuffer(_0xd4421),
            caption: _0xb783b,
            mimetype: 'audio/mpeg',
            ..._0x46597d,
          },
          {
            quoted: _0x4fd81f,
            ..._0x46597d,
          }
        )
      }
    }),
    (_0x3ee304.sendPoll = (
      _0x27dde7,
      _0x25975e = '',
      _0x599fa5 = [],
      _0x4ab46c = 1
    ) => {
      return _0x3ee304.sendMessage(_0x27dde7, {
        poll: {
          name: _0x25975e,
          values: _0x599fa5,
          selectableCount: _0x4ab46c,
        },
      })
    }),
    (_0x3ee304.sendText = (_0x292480, _0x18a498, _0x380da7 = '', _0x41409f) =>
      _0x3ee304.sendMessage(
        _0x292480,
        {
          text: _0x18a498,
          ..._0x41409f,
        },
        {
          quoted: _0x380da7,
          ..._0x41409f,
        }
      )),
    (_0x3ee304.sendImage = async (
      _0x13641b,
      _0x17ef57,
      _0x91aa9f = '',
      _0x31946c = '',
      _0x34fcd4
    ) => {
      let _0x1786c1 = Buffer.isBuffer(_0x17ef57)
        ? _0x17ef57
        : /^data:.?\/.?;base64,/i.test(_0x17ef57)
        ? Buffer.from(_0x17ef57.split`,`[1], 'base64')
        : /^https?:\/\//.test(_0x17ef57)
        ? await getBuffer(_0x17ef57)
        : fs.existsSync(_0x17ef57)
        ? fs.readFileSync(_0x17ef57)
        : Buffer.alloc(0)
      return await _0x3ee304.sendMessage(
        _0x13641b,
        {
          image: _0x1786c1,
          caption: _0x91aa9f,
          ..._0x34fcd4,
        },
        { quoted: _0x31946c }
      )
    }),
    (_0x3ee304.sendVideo = async (
      _0x50e1cb,
      _0x381f64,
      _0x5ef04d = '',
      _0x1bcd8d = '',
      _0x1a096f = false,
      _0x19cfd6
    ) => {
      let _0xbf9ab8 = Buffer.isBuffer(_0x381f64)
        ? _0x381f64
        : /^data:.?\/.?;base64,/i.test(_0x381f64)
        ? Buffer.from(_0x381f64.split`,`[1], 'base64')
        : /^https?:\/\//.test(_0x381f64)
        ? await getBuffer(_0x381f64)
        : fs.existsSync(_0x381f64)
        ? fs.readFileSync(_0x381f64)
        : Buffer.alloc(0)
      return await _0x3ee304.sendMessage(
        _0x50e1cb,
        {
          video: _0xbf9ab8,
          caption: _0x5ef04d,
          gifPlayback: _0x1a096f,
          ..._0x19cfd6,
        },
        { quoted: _0x1bcd8d }
      )
    }),
    (_0x3ee304.sendAudio = async (
      _0x3ae484,
      _0x532597,
      _0x402304 = '',
      _0x2b9760 = false,
      _0x57deb7
    ) => {
      let _0x1776de = Buffer.isBuffer(_0x532597)
        ? _0x532597
        : /^data:.?\/.?;base64,/i.test(_0x532597)
        ? Buffer.from(_0x532597.split`,`[1], 'base64')
        : /^https?:\/\//.test(_0x532597)
        ? await getBuffer(_0x532597)
        : fs.existsSync(_0x532597)
        ? fs.readFileSync(_0x532597)
        : Buffer.alloc(0)
      return await _0x3ee304.sendMessage(
        _0x3ae484,
        {
          audio: _0x1776de,
          ptt: _0x2b9760,
          ..._0x57deb7,
        },
        { quoted: _0x402304 }
      )
    }),
    (_0x3ee304.sendTextWithMentions = async (
      _0x133793,
      _0x21dae1,
      _0x396e86,
      _0x56a98c = {}
    ) => {
      return _0x3ee304.sendMessage(
        _0x133793,
        {
          text: _0x21dae1,
          mentions: [..._0x21dae1.matchAll(/@(\d{0,16})/g)].map(
            (_0x203e60) => _0x203e60[1] + '@s.whatsapp.net'
          ),
          ..._0x56a98c,
        },
        { quoted: _0x396e86 }
      )
    }),
    (_0x3ee304.sendImageAsSticker = async (
      _0x2228b2,
      _0x17ed50,
      _0x2c1885,
      _0x5067f2 = {}
    ) => {
      let _0x4f4c29 = Buffer.isBuffer(_0x17ed50)
          ? _0x17ed50
          : /^data:.?\/.?;base64,/i.test(_0x17ed50)
          ? Buffer.from(_0x17ed50.split`,`[1], 'base64')
          : /^https?:\/\//.test(_0x17ed50)
          ? await getBuffer(_0x17ed50)
          : fs.existsSync(_0x17ed50)
          ? fs.readFileSync(_0x17ed50)
          : Buffer.alloc(0),
        _0x5c0e99
      return (
        _0x5067f2 && (_0x5067f2.packname || _0x5067f2.author)
          ? (_0x5c0e99 = await writeExifImg(_0x4f4c29, _0x5067f2))
          : (_0x5c0e99 = await imageToWebp(_0x4f4c29)),
        await _0x3ee304.sendMessage(
          _0x2228b2,
          {
            sticker: { url: _0x5c0e99 },
            ..._0x5067f2,
          },
          { quoted: _0x2c1885 }
        ),
        _0x5c0e99
      )
    }),
    (_0x3ee304.sendVideoAsSticker = async (
      _0x4aef51,
      _0x3537ee,
      _0x546cda,
      _0x4ee152 = {}
    ) => {
      let _0x89b219 = Buffer.isBuffer(_0x3537ee)
          ? _0x3537ee
          : /^data:.?\/.?;base64,/i.test(_0x3537ee)
          ? Buffer.from(_0x3537ee.split`,`[1], 'base64')
          : /^https?:\/\//.test(_0x3537ee)
          ? await getBuffer(_0x3537ee)
          : fs.existsSync(_0x3537ee)
          ? fs.readFileSync(_0x3537ee)
          : Buffer.alloc(0),
        _0x2a2f9e
      return (
        _0x4ee152 && (_0x4ee152.packname || _0x4ee152.author)
          ? (_0x2a2f9e = await writeExifVid(_0x89b219, _0x4ee152))
          : (_0x2a2f9e = await videoToWebp(_0x89b219)),
        await _0x3ee304.sendMessage(
          _0x4aef51,
          {
            sticker: { url: _0x2a2f9e },
            ..._0x4ee152,
          },
          { quoted: _0x546cda }
        ),
        _0x2a2f9e
      )
    }),
    (_0x3ee304.downloadAndSaveMediaMessage = async (
      _0x3bf141,
      _0x1b3750,
      _0x35c23f = true
    ) => {
      let _0x404e79 = _0x3bf141.msg ? _0x3bf141.msg : _0x3bf141,
        _0x1f4212 = (_0x3bf141.msg || _0x3bf141).mimetype || '',
        _0x29d2db = _0x3bf141.mtype
          ? _0x3bf141.mtype.replace(/Message/gi, '')
          : _0x1f4212.split('/')[0]
      const _0xd53321 = await downloadContentFromMessage(_0x404e79, _0x29d2db)
      let _0x3edeb9 = Buffer.from([])
      for await (const _0x27c294 of _0xd53321) {
        _0x3edeb9 = Buffer.concat([_0x3edeb9, _0x27c294])
      }
      let _0x5a5616 = await FileType.fromBuffer(_0x3edeb9),
        _0x263b5d = _0x35c23f ? _0x1b3750 + '.' + _0x5a5616.ext : _0x1b3750
      return await fs.writeFileSync(_0x263b5d, _0x3edeb9), _0x263b5d
    }),
    (_0x3ee304.downloadMediaMessage = async (_0x14db6e) => {
      let _0x5145b0 = (_0x14db6e.msg || _0x14db6e).mimetype || '',
        _0x5236f7 = _0x14db6e.mtype
          ? _0x14db6e.mtype.replace(/Message/gi, '')
          : _0x5145b0.split('/')[0]
      const _0x503e68 = await downloadContentFromMessage(_0x14db6e, _0x5236f7)
      let _0x22a539 = Buffer.from([])
      for await (const _0x55afe2 of _0x503e68) {
        _0x22a539 = Buffer.concat([_0x22a539, _0x55afe2])
      }
      return _0x22a539
    }),
    (_0x3ee304.sendMedia = async (
      _0x2ab909,
      _0xb7f581,
      _0x51995d = '',
      _0x387e7f = '',
      _0x311ed1 = '',
      _0x23eda6 = {}
    ) => {
      let _0x30385b = await _0x3ee304.getFile(_0xb7f581, true),
        {
          mime: _0x9d9a1,
          ext: _0x1e5987,
          res: _0x3b53ee,
          data: _0x8660dd,
          filename: _0x152407,
        } = _0x30385b
      if ((_0x3b53ee && _0x3b53ee.status !== 200) || file.length <= 65536) {
        try {
          throw { json: JSON.parse(file.toString()) }
        } catch (_0x53c340) {
          if (_0x53c340.json) {
            throw _0x53c340.json
          }
        }
      }
      let _0x3078ad = '',
        _0x172d36 = _0x9d9a1,
        _0xf7fca5 = _0x152407
      if (_0x23eda6.asDocument) {
        _0x3078ad = 'document'
      }
      if (_0x23eda6.asSticker || /webp/.test(_0x9d9a1)) {
        let { writeExif: _0x711ef6 } = require('./lib/exif'),
          _0x2b8e5f = {
            mimetype: _0x9d9a1,
            data: _0x8660dd,
          }
        _0xf7fca5 = await _0x711ef6(_0x2b8e5f, {
          packname: _0x23eda6.packname ? _0x23eda6.packname : global.packname,
          author: _0x23eda6.author ? _0x23eda6.author : global.author,
          categories: _0x23eda6.categories ? _0x23eda6.categories : [],
        })
        await fs.promises.unlink(_0x152407)
        _0x3078ad = 'sticker'
        _0x172d36 = 'image/webp'
      } else {
        if (/image/.test(_0x9d9a1)) {
          _0x3078ad = 'image'
        } else {
          if (/video/.test(_0x9d9a1)) {
            _0x3078ad = 'video'
          } else {
            if (/audio/.test(_0x9d9a1)) {
              _0x3078ad = 'audio'
            } else {
              _0x3078ad = 'document'
            }
          }
        }
      }
      return (
        await _0x3ee304.sendMessage(
          _0x2ab909,
          {
            [_0x3078ad]: { url: _0xf7fca5 },
            caption: _0x387e7f,
            mimetype: _0x172d36,
            fileName: _0x51995d,
            ..._0x23eda6,
          },
          {
            quoted: _0x311ed1,
            ..._0x23eda6,
          }
        ),
        fs.promises.unlink(_0xf7fca5)
      )
    }),
    (_0x3ee304.copyNForward = async (
      _0x3ef717,
      _0x5d4f75,
      _0xa2e985 = false,
      _0xbb3454 = {}
    ) => {
      let _0x42bd29
      _0xbb3454.readViewOnce &&
        ((_0x5d4f75.message =
          _0x5d4f75.message &&
          _0x5d4f75.message.ephemeralMessage &&
          _0x5d4f75.message.ephemeralMessage.message
            ? _0x5d4f75.message.ephemeralMessage.message
            : _0x5d4f75.message || undefined),
        (_0x42bd29 = Object.keys(_0x5d4f75.message.viewOnceMessage.message)[0]),
        delete (_0x5d4f75.message && _0x5d4f75.message.ignore
          ? _0x5d4f75.message.ignore
          : _0x5d4f75.message || undefined),
        delete _0x5d4f75.message.viewOnceMessage.message[_0x42bd29].viewOnce,
        (_0x5d4f75.message = { ..._0x5d4f75.message.viewOnceMessage.message }))
      let _0x543c70 = Object.keys(_0x5d4f75.message)[0],
        _0x382ee0 = await generateForwardMessageContent(_0x5d4f75, _0xa2e985),
        _0x194a60 = Object.keys(_0x382ee0)[0],
        _0x289d67 = {}
      if (_0x543c70 != 'conversation') {
        _0x289d67 = _0x5d4f75.message[_0x543c70].contextInfo
      }
      _0x382ee0[_0x194a60].contextInfo = {
        ..._0x289d67,
        ..._0x382ee0[_0x194a60].contextInfo,
      }
      const _0x4e941d = await generateWAMessageFromContent(
        _0x3ef717,
        _0x382ee0,
        _0xbb3454
          ? {
              ..._0x382ee0[_0x194a60],
              ..._0xbb3454,
              ...(_0xbb3454.contextInfo
                ? {
                    contextInfo: {
                      ..._0x382ee0[_0x194a60].contextInfo,
                      ..._0xbb3454.contextInfo,
                    },
                  }
                : {}),
            }
          : {}
      )
      return (
        await _0x3ee304.relayMessage(_0x3ef717, _0x4e941d.message, {
          messageId: _0x4e941d.key.id,
        }),
        _0x4e941d
      )
    }),
    (_0x3ee304.cMod = (
      _0x57bddd,
      _0x280f02,
      _0x253f7f = '',
      _0x3cac52 = _0x3ee304.user.id,
      _0x11463b = {}
    ) => {
      let _0x507975 = Object.keys(_0x280f02.message)[0],
        _0x2330c6 = _0x507975 === 'ephemeralMessage'
      _0x2330c6 &&
        (_0x507975 = Object.keys(_0x280f02.message.ephemeralMessage.message)[0])
      let _0x1c8262 = _0x2330c6
          ? _0x280f02.message.ephemeralMessage.message
          : _0x280f02.message,
        _0x2e7174 = _0x1c8262[_0x507975]
      if (typeof _0x2e7174 === 'string') {
        _0x1c8262[_0x507975] = _0x253f7f || _0x2e7174
      } else {
        if (_0x2e7174.caption) {
          _0x2e7174.caption = _0x253f7f || _0x2e7174.caption
        } else {
          if (_0x2e7174.text) {
            _0x2e7174.text = _0x253f7f || _0x2e7174.text
          }
        }
      }
      if (typeof _0x2e7174 !== 'string') {
        _0x1c8262[_0x507975] = {
          ..._0x2e7174,
          ..._0x11463b,
        }
      }
      if (_0x280f02.key.participant) {
        _0x3cac52 = _0x280f02.key.participant =
          _0x3cac52 || _0x280f02.key.participant
      } else {
        if (_0x280f02.key.participant) {
          _0x3cac52 = _0x280f02.key.participant =
            _0x3cac52 || _0x280f02.key.participant
        }
      }
      if (_0x280f02.key.remoteJid.includes('@s.whatsapp.net')) {
        _0x3cac52 = _0x3cac52 || _0x280f02.key.remoteJid
      } else {
        if (_0x280f02.key.remoteJid.includes('@broadcast')) {
          _0x3cac52 = _0x3cac52 || _0x280f02.key.remoteJid
        }
      }
      return (
        (_0x280f02.key.remoteJid = _0x57bddd),
        (_0x280f02.key.fromMe = _0x3cac52 === _0x3ee304.user.id),
        proto.WebMessageInfo.fromObject(_0x280f02)
      )
    }),
    (_0x3ee304.sendFile = async (
      _0x43aca8,
      _0x5720aa,
      _0x13d38c = '',
      _0x409196 = '',
      _0x22f01f,
      _0x41478c = false,
      _0x3dac9e = {}
    ) => {
      let _0x148d21 = await _0x3ee304.getFile(_0x5720aa, true),
        { res: _0x5c8056, data: _0x1f7316, filename: _0x510809 } = _0x148d21
      if (
        (_0x5c8056 && _0x5c8056.status !== 200) ||
        _0x1f7316.length <= 65536
      ) {
        try {
          throw { json: JSON.parse(_0x1f7316.toString()) }
        } catch (_0xe4a2dc) {
          if (_0xe4a2dc.json) {
            throw _0xe4a2dc.json
          }
        }
      }
      let _0x114ac7 = { filename: _0x13d38c }
      if (_0x22f01f) {
        _0x114ac7.quoted = _0x22f01f
      }
      if (!_0x148d21) {
        _0x3dac9e.asDocument = true
      }
      let _0x2fc16c = '',
        _0x8c43f9 = _0x148d21.mime,
        _0x1b6693
      if (
        /webp/.test(_0x148d21.mime) ||
        (/image/.test(_0x148d21.mime) && _0x3dac9e.asSticker)
      ) {
        _0x2fc16c = 'sticker'
      } else {
        if (
          /image/.test(_0x148d21.mime) ||
          (/webp/.test(_0x148d21.mime) && _0x3dac9e.asImage)
        ) {
          _0x2fc16c = 'image'
        } else {
          if (/video/.test(_0x148d21.mime)) {
            _0x2fc16c = 'video'
          } else {
            if (/audio/.test(_0x148d21.mime)) {
              _0x1b6693 = await (_0x41478c ? toPTT : toAudio)(
                _0x1f7316,
                _0x148d21.ext
              )
              _0x1f7316 = _0x1b6693.data
              _0x510809 = _0x1b6693.filename
              _0x2fc16c = 'audio'
              _0x8c43f9 = 'audio/ogg codecs=opus'
            } else {
              _0x2fc16c = 'document'
            }
          }
        }
      }
      if (_0x3dac9e.asDocument) {
        _0x2fc16c = 'document'
      }
      delete _0x3dac9e.asSticker
      delete _0x3dac9e.asLocation
      delete _0x3dac9e.asVideo
      delete _0x3dac9e.asDocument
      delete _0x3dac9e.asImage
      let _0x4c3906 = {
          ..._0x3dac9e,
          caption: _0x409196,
          ptt: _0x41478c,
          [_0x2fc16c]: { url: _0x510809 },
          mimetype: _0x8c43f9,
        },
        _0x44986e
      try {
        _0x44986e = await _0x3ee304.sendMessage(_0x43aca8, _0x4c3906, {
          ..._0x114ac7,
          ..._0x3dac9e,
        })
      } catch (_0x1ef12b) {
        _0x44986e = null
      } finally {
        if (!_0x44986e) {
          _0x44986e = await _0x3ee304.sendMessage(
            _0x43aca8,
            {
              ..._0x4c3906,
              [_0x2fc16c]: _0x1f7316,
            },
            {
              ..._0x114ac7,
              ..._0x3dac9e,
            }
          )
        }
        return (_0x1f7316 = null), _0x44986e
      }
    }),
    (_0x3ee304.getFile = async (_0x1191aa, _0x1329a6) => {
      let _0x2b9fb2,
        _0x46a858 = Buffer.isBuffer(_0x1191aa)
          ? _0x1191aa
          : /^data:.?\/.?;base64,/i.test(_0x1191aa)
          ? Buffer.from(_0x1191aa.split`,`[1], 'base64')
          : /^https?:\/\//.test(_0x1191aa)
          ? await (_0x2b9fb2 = await getBuffer(_0x1191aa))
          : fs.existsSync(_0x1191aa)
          ? ((filename = _0x1191aa), fs.readFileSync(_0x1191aa))
          : typeof _0x1191aa === 'string'
          ? _0x1191aa
          : Buffer.alloc(0),
        _0x4f917f = (await FileType.fromBuffer(_0x46a858)) || {
          mime: 'application/octet-stream',
          ext: '.bin',
        }
      filename = path.resolve(
        __dirname,
        './database/src/' + new Date() * 1 + '.' + _0x4f917f.ext
      )
      if (_0x46a858 && _0x1329a6) {
        fs.promises.writeFile(filename, _0x46a858)
      }
      return {
        res: _0x2b9fb2,
        filename: filename,
        size: await getSizeMedia(_0x46a858),
        ..._0x4f917f,
        data: _0x46a858,
      }
    }),
    _0x3ee304.ev.on('messages.upsert', async (_0x4b31a3) => {
      try {
        let _0x2def54 = _0x4b31a3.messages[0]
        if (!_0x2def54.message) {
          return
        }
        _0x2def54.message =
          Object.keys(_0x2def54.message)[0] === 'ephemeralMessage'
            ? _0x2def54.message.ephemeralMessage.message
            : _0x2def54.message
        if (_0x2def54.key && _0x2def54.key.remoteJid === 'status@broadcast') {
          return
        }
        if (
          _0x2def54.key.id.startsWith('BAE5') &&
          _0x2def54.key.id.length === 16
        ) {
          return
        }
        if (_0x2def54.key.id.startsWith('FatihArridho_')) {
          return
        }
        let _0x145e58 = smsg(_0x3ee304, _0x2def54, _0xfcbc23)
        require('./spider8.js')(_0x3ee304, _0x145e58, _0x4b31a3, _0xfcbc23)
      } catch (_0x528a73) {
        console.log(_0x528a73)
      }
    }),
    _0x3ee304.ev.process(async (_0x15c27d) => {
      _0x15c27d['creds.update'] && (await _0x382b0a())
    }),
    _0x3ee304.ev.on('call', async (_0x5d9936) => {
      console.log(JSON.stringify(_0x5d9936, undefined, 2))
    }),
    _0x3ee304
  )
}
tdxStart()
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright('Update ' + __filename))
  delete require.cache[file]
  require(file)
})
