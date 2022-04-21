# Introduction

A Node-RED library for handling various alarm states with nodes:
 - value parsing
 - topic parsing
 - condition handling
 - generating text massages
 - collecting messages
 - filtering messages
 - message summaries for sending and displaying

All nodes work with an alarm object in message which can have the following properties:
 - device
 - value
 - unit
 - state
 - status
 - statusText
 - comparison
 - comparisonOk
 - comparisonAlarm
